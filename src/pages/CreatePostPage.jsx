import { useEffect, useState } from "react";
import { getCategory,createCategory, updateBlog } from "@/services/apiBlog"; 
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import InputError from "@/ui_components/InputError";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBlog } from "@/services/apiBlog";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import SmallSpinner from "@/ui_components/SmallSpinner";
import { useForm } from "react-hook-form";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";


const CreatePostPage = ({blog,isAuthenticated}) => {
  const { register, handleSubmit, formState, setValue } = useForm({defaultValues: blog? blog : {}});
  const [category, setCategory] = useState([]);
  const {errors} = formState
  const [customCategory, setCustomCategory] = useState("");
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchJobTitles = async () => {
      try {
        const data = await getCategory();
        console.log("Fetched job titles:", data);
        console.log("jobTitles:", data);
        setCategory(data);
        console.log("Final Category Array:", data);
      } catch (err) {
        console.error("Failed to fetch job titles:", err);
      }
    };
    fetchJobTitles();
  }, []);

  const handleCategoryChange = (value) => {
    setValue("category", value);
    setCustomCategory(""); 
  };

  const handleCustomCategory = (e) => {
    const value = e.target.value;
    setCustomCategory(value);
    setValue("category", value);
  };
  const blogID = blog?.id; //Only fetch the id of blog which exists blog.id will throw an error if blog does not exists with that particular id.

  // Mutation for updating the blog
  const updateMutation = useMutation({
    mutationFn: ({ data, id }) => updateBlog(data, id),
    onSuccess: () => {
      navigate("/");
      toast.success("Your post has been updated successfully!");
      console.log("Your post has been updated successfully!");
    },
    
    onError: (err) => {
      toast.error(err.message);
      console.log("Error updating blog", err);
    },
  });

  // Mutation for creating the post
  const mutation = useMutation({
    mutationFn: (data) => createBlog(data),
    onSuccess: () => {
      toast.success("New post added successfully");
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate("/");
    },
  });

  // Function for submitting the form
  const onSubmit = async (data) => {
    if (data.category && customCategory.trim()) {
      toast.error("Please select either a category or enter a new one — not both.");
      return;
    }
    try {
      // If customCategory is entered and not in existing list, create it
      const exists = category.find(
        (title) => title.name.toLowerCase() === customCategory.toLowerCase()
      );
      if (customCategory && !exists) {
        await createCategory(customCategory);
        const updatedTitles = await getCategory();
        setCategory(updatedTitles);
      }
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("content", data.content);
      if (customCategory) {
        data.category = customCategory;
      }
      formData.append("category", data.category);
      //During update featured_image was passed as "/" which is not a file so error
      if (data.featured_image && data.featured_image[0]) {
        if (data.featured_image[0] != "/") {
          formData.append("featured_image", data.featured_image[0]);
        }
      }
      if (blog && blogID) {
        updateMutation.mutate({ data: formData, id: blogID });
      } 
      else {
        mutation.mutate(formData);
      }
    } catch (err) {
      console.error("Error submitting post:", err);
    }
  }
    //This was written in the case when session has expired then you need to login again
    if (isAuthenticated === false) {
        return <LoginPage />;
    }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${blog && "h-[90%] overflow-auto"}  md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-6 w-fit rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl max-sm:text-xl">
          {blog ? "Update Post" : "Create Post"}
        </h3>
        
        <p className="max-sm:text-[14px]">
          {blog
            ? "Do you want to update your post?"
            : "Create a new post and share your ideas."}
        </p>
        
      </div>

      <div>
        <Label htmlFor="title" className="dark:text-[97989F]">
          Title
        </Label>
        <Input
          type="text"
          id="title"
          {...register("title", {
            required: "Blog's title is required",
            minLength: {
              value: 3,
              message: "The title must be at least 3 characters",
            },
          })}
          placeholder="Give your post a title"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[400px] max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.title?.message && <InputError error={errors.title.message} />}
      </div>

      <div>
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="Write your blog post"
          {...register("content", {
            required: "Blog's content is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[400px] text-justify max-sm:w-[300px] max-sm:text-[14px]"
        />
        {errors?.content?.message && (
          <InputError error={errors.content.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={handleCategoryChange} defaultValue={blog? blog.category:""}>
          <SelectTrigger className="...">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Categories</SelectLabel>
              {category.map((title) => (
              <SelectItem key={title.id} value={title.name}>
                {title.name}
              </SelectItem>
            ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full">
        <Label htmlFor="customCategory">Enter a new category</Label>
        <Input
          type="text"
          id="customCategory"
          value={customCategory}
          onChange={handleCustomCategory}
          placeholder="Enter a new job title if not listed"
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full"
        />
        {errors?.category?.message && (
          <InputError error={errors.category.message} />
        )}
      </div>

      <div className="w-full">
        <Label htmlFor="featured_image">Featured Image</Label>
        <Input
          type="file"
          id="picture"
          {...register("featured_image", {
            required: blog ? false : "Blog's featured image is required",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />

        {errors?.featured_image?.message && (
          <InputError error={errors.featured_image.message} />
        )}
      </div>


      <div className="w-full flex items-center justify-center flex-col my-4">
        {blog ? (
          <button
            disabled={updateMutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {updateMutation.isPending ? (
              <>
                {" "}
                <SmallSpinner /> <SmallSpinnerText text="Updating post..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Update post" />
            )}
          </button>
        ) : (
          <button
            disabled={mutation.isPending}
            className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2"
          >
            {mutation.isPending ? (
              <>
                {" "}
                <SmallSpinner /> <SmallSpinnerText text="Creating post..." />{" "}
              </>
            ) : (
              <SmallSpinnerText text="Create post" />
            )}
          </button>
        )}
      </div>
    </form>
  )
}

export default CreatePostPage
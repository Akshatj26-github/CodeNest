import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { registerUser, updateProfile } from "@/services/apiBlog";
import InputError from "@/ui_components/InputError";
import SmallSpinner from "@/ui_components/SmallSpinner";
import SmallSpinnerText from "@/ui_components/SmallSpinnerText";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SignupPage = ({userInfo,updateForm,toggleModal}) => {
  console.log(userInfo)

  const { register, handleSubmit, formState, reset, watch } = useForm({defaultValues: userInfo ? userInfo : {}});
  const { errors } = formState;
  const queryClient = useQueryClient()  
  const password = watch("password");
  const navigate = useNavigate();

  const updateProfileMutation = useMutation({
    mutationFn: (data) => updateProfile(data),
    onSuccess: (response) => {
      toast.success("Profile updated successfully! Please Refresh")
      toggleModal()
      queryClient.invalidateQueries({ queryKey: ["users", userInfo?.username] });
      const newUsername = response.username || userInfo?.username;

      queryClient.invalidateQueries({ queryKey: ["users", newUsername] });

      if (newUsername !== userInfo?.username) {
        navigate(`/profile/${newUsername}`); 
      }
    },    

    onError: (err) => {
      toast.error(err.message)
    }
  })

  const mutation = useMutation({
    mutationFn: (data) => registerUser(data),
    onSuccess: () => {
      toast.success("You have successfully created an account!!!");
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });
  function onSubmit(data) {
    if(updateForm){
      const formData = new FormData()
      formData.append("username", data.username)
      formData.append("first_name", data.first_name)
      formData.append("last_name", data.last_name)
      formData.append("job_title", data.job_title)
      formData.append("bio", data.bio)

      if(data.profile_picture && data.profile_picture[0]){
        if(data.profile_picture[0] != "/"){
          formData.append("profile_picture", data.profile_picture[0])
        }
      }
      updateProfileMutation.mutate(formData)
    }
    else{
      mutation.mutate(data)
    }
  }

  return (
    <form
      className={`${
        updateForm && "h-[90%] overflow-auto"
      } md:px-16 px-8 py-6 flex flex-col mx-auto my-9 items-center gap-4 w-fit 
    rounded-lg bg-[#FFFFFF] shadow-xl dark:text-white dark:bg-[#141624]`}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        <h3 className="font-semibold text-2xl">
          {updateForm ? "Update Profile Form" : "SignUp Form"}
        </h3>
        <p>
          {updateForm
            ? "You can tell us more about you."
            : "Create your account to get started!"}
        </p>
      </div>

      <div>
        <Label htmlFor="username" className="dark:text-[97989F]">
          Username
        </Label>
        <Input
          type="text"
          id="username"
          placeholder="Enter username"
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 2,
              message: "Username must be at least 2 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.username?.message && (
          <small className="text-red-700">{errors.username.message}</small>
        )}
      </div>

      <div>
        <Label htmlFor="first_name">First Name</Label>
        <Input
          type="text"
          id="first_name"
          placeholder="Enter first name"
          {...register("first_name", {
            required: "Firstname is required",
            minLength: {
              value: 2,
              message: "Firstname must be at least 2 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.first_name?.message && (
          <small className="text-red-700">{errors.first_name.message}</small>
        )}
      </div>

      <div>
        <Label htmlFor="last_name">Last Name</Label>
        <Input
          type="text"
          id="last_name"
          placeholder="Enter last name"
          {...register("last_name", {
            required: "Lastname is required",
            minLength: {
              value: 2,
              message: "Lastname must be at least 2 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.last_name?.message && (
          <small className="text-red-700">{errors.last_name.message}</small>
        )}
      </div>

      {updateForm && <div>
        <Label htmlFor="job_title" className="dark:text-[97989F]">
          Job Title
        </Label>
        <Input
          type="text"
          id="job_title"
          placeholder="Enter Job Title"
          {...register("job_title", {
            required: "Your job title is required",
            minLength: {
              value: 3,
              message: "Your job title must be at least 3 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.job_title?.message && (
          <InputError error={errors.job_title.message} />
        )}
      </div>}


      {updateForm && <div>
        <Label htmlFor="content">Bio</Label>
        <Textarea
          id="content"
          placeholder="Tell us more about you"
          {...register("bio", {
            required: "Your bio is required",
            minLength: {
              value: 10,
              message: "The content must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[180px]  w-[300px] text-justify"
        />
        {errors?.bio?.message && (
          <InputError error={errors.bio.message} />
        )}
      </div>}

      {updateForm && <div className="w-full">
        <Label htmlFor="profile_picture">Profile Picture</Label>
        <Input
          type="file"
          id="picture"
          {...register("profile_picture", {
            required: false,
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-full max-sm:w-[300px] max-sm:text-[14px]"
        />

        {/* {errors?.profile_picture?.message && (
          <InputError error={errors.profile_picture.message} />
        )} */}
      </div>}

      {updateForm || <div>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          placeholder="Enter password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.password?.message && (
          <InputError error={errors.password.message} />
        )}
      </div>}

      {updateForm ||  <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          type="password"
          id="confirmPassword"
          placeholder="Confirm password"
          {...register("confirmPassword", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            validate: (value) => value === password || "Passwords do not match",
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.confirmPassword?.message && (
          <InputError error={errors.confirmPassword.message} />
        )}
      </div>}

      {updateForm && <div>
        <Label htmlFor="instagram" className="dark:text-[97989F]">
          Instagram
        </Label>
        <Input
          type="url"
          id="instagram"
          placeholder="Enter Instagram URL"
          {...register("instagram", {
            minLength: {
              value: 10,
              message: "Your instagram url must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.instagram?.message && (
          <InputError error={errors.instagram.message} />
        )}
      </div>}

      {updateForm && <div>
        <Label htmlFor="facebook" className="dark:text-[97989F]">
          Facebook
        </Label>
        <Input
          type="url"
          id="facebook"
          placeholder="Enter Facebook URL"
          {...register("facebook", {
            minLength: {
              value: 10,
              message: "Your facebook url must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.facebook?.message && (
          <InputError error={errors.facebook.message} />
        )}
      </div>}

      {updateForm && <div>
        <Label htmlFor="twitter" className="dark:text-[97989F]">
          Twitter
        </Label>
        <Input
          type="url"
          id="twitter"
          placeholder="Enter Twitter URL"
          {...register("twitter", {
            minLength: {
              value: 10,
              message: "Your twitter url must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.twitter?.message && (
          <InputError error={errors.twitter.message} />
        )}
      </div>}

      {updateForm && <div>
        <Label htmlFor="youtube" className="dark:text-[97989F]">
          YouTube
        </Label>
        <Input
          type="url"
          id="youtube"
          placeholder="Enter YouTube URL"
          {...register("youtube", {
            minLength: {
              value: 10,
              message: "Your youtube url must be at least 10 characters",
            },
          })}
          className="border-2 border-[#141624] dark:border-[#3B3C4A] focus:outline-0 h-[40px] w-[300px]"
        />
        {errors?.youtube?.message && (
          <InputError error={errors.youtube.message} />
        )}
      </div>}


      <div className="w-full flex items-center justify-center flex-col my-4">
        {updateForm ? (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Updating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Update user profile" />
            )}
          </button>
        ) : (
          <button className="bg-[#4B6BFB] text-white w-full py-3 px-2 rounded-md flex items-center justify-center gap-2">
            {mutation.isPending ? (
              <>
                <SmallSpinner />
                <SmallSpinnerText text="Creating user..." />
              </>
            ) : (
              <SmallSpinnerText text="Signup" />
            )}
          </button>
        )}
        {!updateForm && <p className="text-[14px]">
          Already have an account? <Link to="/login">LogIn</Link>
        </p>}
      </div>
    </form>
  );
};

export default SignupPage;
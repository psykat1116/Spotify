import React, { useState } from "react";
import Modal from "./Modal";
import uniqid from "uniqid";
import useUploadModal from "../../hooks/useUploadModal";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import { useUser } from "@supabase/auth-helpers-react";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

const UploadModal = () => {
  const user = useUser();
  const uploadModal = useUploadModal();
  const [isLoading, setIsLoading] = useState(false);
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });
  const onChange = (open:boolean) => {
    if (!open) {
      reset();
      return uploadModal.onClose();
    }
  };
  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Please select a song and image");
        return;
      }
      const uniqueId = uniqid();
      const { data: songData, error: songError } = await supabaseClient.storage
        .from("Songs")
        .upload(`song-${values.title}-${uniqueId}`, songFile, {
          cacheControl: "3600",
          upsert: false,
        });
      if (songError) {
        return toast.error(songError.message);
      }
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from("Images")
          .upload(`image-${values.title}-${uniqueId}`, imageFile, {
            cacheControl: "3600",
            upsert: false,
          });
      if (imageError) {
        return toast.error(imageError.message);
      }
      const { error: supabaseError } = await supabaseClient
        .from("Songs")
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData?.path,
          song_path: songData?.path,
        });
      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      }
      router.refresh();
      setIsLoading(false);
      toast.success("Song uploaded successfully");
      reset();
      uploadModal.onClose();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Upload modal title"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a Song</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            {...register("song", { required: true })}
            accept=".mp3"
            multiple={false}
          />
        </div>
        <div>
          <div className="pb-1">Select an Image</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            {...register("image", { required: true })}
            accept="image/*"
            multiple={false}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;

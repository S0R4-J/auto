"use client";

import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const fileExt = file.name.split(".").pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
    const storageRef = ref(storage, `cars/${fileName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    setIsLoading(true);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error("Upload error:", error);
        setIsLoading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          onChange(downloadURL);
          setIsLoading(false);
        });
      }
    );
  };

  const onRemove = () => {
    onChange("");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        {value ? (
          <div className="relative h-[200px] w-[300px] overflow-hidden rounded-md border">
            <div className="absolute right-2 top-2 z-10">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Car Image"
              src={value}
            />
          </div>
        ) : (
          <div className="flex h-[200px] w-[300px] items-center justify-center rounded-md border border-dashed bg-muted/50">
            <span className="text-sm text-muted-foreground">
              No image uploaded
            </span>
          </div>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="image/*"
          disabled={disabled || isLoading}
          onChange={onUpload}
          className="w-[300px]"
        />
        {isLoading && (
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";
import React, { FormEvent, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Card, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const target = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
    };
    if (target.username.value.length < 1) {
      toast.error("please enter username");
      setIsLoading(false);
      return;
    }
    if (target.password.value.length < 1) {
      toast.error("please enter password");
      setIsLoading(false);
      return;
    }
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: target.username.value,
        password: target.password.value,
      });
      if (res) {
        if (res.status === 200) {
          toast.success("Login sucess");
        }
        setIsLoading(false);
        toast.error("please check password or username");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      toast.remove();
    }
  };

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="p-4 w-[450px] gap-2 ">
            <h2 className="text-center">login</h2>
            <Input label="username" id="username"></Input>
            <Input label="password" id="password"></Input>
            <Button type="submit" color="primary" isLoading={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
            <p className="text-center">or</p>
            <Button
              onClick={() =>
                signIn("google", {
                  redirect: true,
                  callbackUrl: "/profile",
                })
              }
              color="warning"
              variant="light"
            >
              <FcGoogle />
              google
            </Button>
          </Card>
        </form>
      </div>
    </>
  );
}

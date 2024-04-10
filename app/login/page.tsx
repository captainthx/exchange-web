"use client";
import React, { FormEvent, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Card, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
export default function LogIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session, status } = useSession();

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
        console.log("response ", res);
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
  if (status == "authenticated") {
    return (
      <>
        <p> Signed in as {session.user?.username}</p>
        <Button onClick={() => signOut()}>signOut</Button>
      </>
    );
  }
  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <form onSubmit={handleSubmit}>
          <Card className="p-4 w-[450px] gap-2 ">
            <h2 className="text-center">login</h2>
            <Input label="username" id="username"></Input>
            <Input label="password" id="password"></Input>
            <Button type="submit" isLoading={isLoading}>
              {isLoading ? "Loading..." : "Login"}
            </Button>
          </Card>
        </form>
      </div>
    </>
  );
}

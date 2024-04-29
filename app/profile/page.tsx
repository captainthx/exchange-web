"use client";
import { Card, CardHeader, CardBody, Image, Button } from "@nextui-org/react";
import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (session && status == "authenticated") {
    return (
      <>
        <div className="flex h-screen flex-col">
          <Card className="flex-1 items-center justify-center text-2xl">
            <h2>Profile page</h2>
            <div>
              <CardHeader className="flex-col">
                <Image
                  alt="Card background"
                  src={
                    session.user?.image
                      ? session.user.image
                      : "https://demofree.sirv.com/nope-not-here.jpg"
                  }
                  width={100}
                />
              </CardHeader>
              <CardBody>
                <h3 className="font-bold text-large">
                  {" "}
                  name:
                  {session.user?.username
                    ? session.user.username
                    : session.user?.name}
                </h3>
                <Button onClick={() => signOut()}>signOut</Button>
              </CardBody>
            </div>
          </Card>
        </div>
      </>
    );
  } else {
    return (
      <>
        <p className="text-center">no data</p>
      </>
    );
  }
}

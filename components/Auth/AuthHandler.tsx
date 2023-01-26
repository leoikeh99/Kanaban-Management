"use client";
import React, { useContext } from "react";
import styles from "./styles.module.css";
import formStyles from "@/styles/formStyles.module.css";
import ModalContext from "@/context/ModalContext";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AuthHandler = () => {
  const { toggleModal } = useContext(ModalContext);
  const { data, status } = useSession();
  const router = useRouter();

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  return (
    <div className={styles.authHandler}>
      <>
        {!data?.user ? (
          <button
            className={`${formStyles.btn} ${formStyles.primary}`}
            onClick={() => toggleModal("Login")}
            disabled={status !== "unauthenticated"}>
            Login
          </button>
        ) : (
          <div className={styles.authenticated}>
            <Image
              src={`https://avatars.dicebear.com/api/identicon/${data.user.name}.svg`}
              alt="avatar"
              width={30}
              height={30}
            />
            <div>
              <p>{data.user.name}</p>
              <button onClick={() => logout()}>Logout</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default AuthHandler;

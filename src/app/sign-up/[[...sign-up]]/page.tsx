import Image from "next/image";
import { SignUp } from "@clerk/nextjs";
import backdrop from "../../backdrop.module.css";
import styles from "../../auth.module.css";
import { clerkAppearance } from "../../clerkAppearance";
import Logo from "@/assets/breezebuild-logo.svg";

export default function SignUpPage() {
  return (
    <div className={backdrop.bg}>
      <div className={`${backdrop.content} ${styles.wrap}`}>
        <Image src={Logo} alt="BreezeBuild" priority className={styles.logo} />
        <SignUp appearance={clerkAppearance} />
      </div>
    </div>
  );
}

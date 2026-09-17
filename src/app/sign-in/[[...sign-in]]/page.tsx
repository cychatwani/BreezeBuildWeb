import Image from "next/image";
import { SignIn } from "@clerk/nextjs";
import backdrop from "../../backdrop.module.css";
import styles from "../../auth.module.css";
import { clerkAppearance } from "../../clerkAppearance";
import Logo from "@/assets/breezebuild-logo.svg";

export default function SignInPage() {
  return (
    <div className={backdrop.bg}>
      <div className={`${backdrop.content} ${styles.wrap}`}>
        <Image src={Logo} alt="BreezeBuild" priority className={styles.logo} />
        <SignIn appearance={clerkAppearance} />
      </div>
    </div>
  );
}

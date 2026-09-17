import type { ComponentType, SVGProps } from "react";
import {
  AwsIcon,
  FlywayIcon,
  GithubIcon,
  GradleIcon,
  JavaIcon,
  LombokIcon,
  PostgresIcon,
  RedisIcon,
  Resilience4jIcon,
  SpringBootIcon,
} from "./techIcons";

export type StackLayer = {
  id: string;
  name: string;
  /** Short role label shown beside the name in the stack. */
  role: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /**
   * Brand colour, or null to render monochrome. Null is used where the official
   * colour is brand-black (Gradle, GitHub) or where no official mark exists.
   */
  tone: string | null;
  body: string;
};

export const STACK_LAYERS: StackLayer[] = [
  {
    id: "java",
    name: "Java 21",
    role: "Language",
    icon: JavaIcon,
    tone: null, // artwork carries its own blue/red fills
    body: "Modern Java as the foundation. BreezeBuild starts with current JVM capabilities and strong, maintainable backend fundamentals.",
  },
  {
    id: "spring-boot",
    name: "Spring Boot",
    role: "Framework",
    icon: SpringBootIcon,
    tone: "#6DB33F",
    body: "Production-oriented backend services with clear application boundaries, dependency injection, validation, security, transactions, and API conventions.",
  },
  {
    id: "postgres",
    name: "PostgreSQL / AWS RDS",
    role: "Persistence",
    icon: PostgresIcon,
    tone: "#4169E1",
    body: "Reliable relational persistence for core application data, with AWS RDS providing a production-ready managed database option.",
  },
  {
    id: "redis",
    name: "Redis",
    role: "Cache",
    icon: RedisIcon,
    tone: "#FF4438",
    body: "Low-latency caching and state where it provides real value, without introducing unnecessary infrastructure.",
  },
  {
    id: "flyway",
    name: "Flyway",
    role: "Migrations",
    icon: FlywayIcon,
    tone: "#D8332C",
    body: "Explicit, versioned database migrations so schema evolution remains predictable and reviewable.",
  },
  {
    id: "resilience4j",
    name: "Resilience4j",
    role: "Reliability",
    icon: Resilience4jIcon,
    tone: null,
    body: "Resilience patterns such as retries, circuit breakers, rate limiting, and fault isolation are part of the engineering approach rather than afterthoughts.",
  },
  {
    id: "lombok",
    name: "Lombok",
    role: "Codegen",
    icon: LombokIcon,
    tone: null,
    body: "Less repetitive Java boilerplate while keeping generated projects concise and readable.",
  },
  {
    id: "gradle",
    name: "Gradle",
    role: "Build",
    icon: GradleIcon,
    tone: null, // official #02303A is brand-black; unreadable on our surface
    body: "Standardized builds, dependency management, and consistent project conventions across generated applications.",
  },
  {
    id: "aws",
    name: "AWS",
    role: "Infrastructure",
    icon: AwsIcon,
    tone: null, // artwork carries its own #f90
    body: "Production infrastructure and deployment foundations for applications that need to move beyond the local environment.",
  },
  {
    id: "github",
    name: "GitHub",
    role: "Source control",
    icon: GithubIcon,
    tone: null, // brand-black; light monochrome is GitHub's own dark-bg guidance
    body: "Source control, organized diffs, history, review, and collaboration built into the development workflow.",
  },
];

export const DEFAULT_LAYER_ID = "java";

/** The in-browser engineering loop, rendered as a connected flow. */
export const WORKFLOW_STEPS = [
  "Write tests",
  "Implement",
  "Review diff",
  "Run tests",
  "Inspect API",
  "Test with synthetic data",
  "Preview deployment",
];

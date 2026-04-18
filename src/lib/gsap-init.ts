// Central GSAP plugin registration — import this in every Client Component
// that uses ScrollTrigger. GSAP guards against double-registration internally.
// NEVER import this from a Server Component.
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

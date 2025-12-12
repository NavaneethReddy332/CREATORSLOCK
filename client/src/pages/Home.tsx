import { Layout } from "@/components/Layout";
import { Hero, ServicesGrid, AboutSection, ContactSection } from "@/components/HomeSections";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <ServicesGrid />
      <AboutSection />
      <ContactSection />
    </Layout>
  );
}

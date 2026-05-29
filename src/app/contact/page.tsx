import Link from "next/link";
import FadeUp from "@/components/ui/FadeUp";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="dpr-contact-page">
      <section className="dpr-contact-hero">
        <FadeUp>
          <p>Contact & Support</p>
        </FadeUp>

        <FadeUp delay={0.08}>
          <h1>Reach Destiny Point Realty for support and business inquiries.</h1>
        </FadeUp>

        <FadeUp delay={0.16}>
          <span>
            Use this page for general support, partnership conversations,
            business inquiries, platform assistance, and follow-up requests.
          </span>
        </FadeUp>
      </section>

      <section className="dpr-contact-grid">
        <FadeUp>
          <ContactForm />
        </FadeUp>

        <FadeUp delay={0.08}>
          <aside className="dpr-contact-panel">
            <p>Support Desk</p>

            <h2>Every serious conversation deserves a clear channel.</h2>

            <div>
              <article>
                <span>01</span>
                <strong>Submit your request</strong>
              </article>

              <article>
                <span>02</span>
                <strong>We review the context</strong>
              </article>

              <article>
                <span>03</span>
                <strong>The right desk follows up</strong>
              </article>
            </div>

            <Link href="/consultation">Need strategic guidance?</Link>
          </aside>
        </FadeUp>
      </section>
    </main>
  );
}
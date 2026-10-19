import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/contact";
import { LegalPage } from "@/components/LegalPage";

const title = "Privacy policy — bigO";
const description = "What personal information the bigO website collects, why, who processes it, and your choices.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/privacy" },
};

/* Written from what the site actually does: no cookies or analytics; the
   contact form is the only place personal data is collected. Update this
   page if that changes (e.g. adding analytics or a booking widget). */
export default function PrivacyPage() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalPage
      label="Privacy"
      title="Privacy policy"
      updated="19 October 2026"
      intro={
        <p>
          bigO is a software studio based in Delhi NCR, India. This page explains what information this website collects,
          why, and what you can ask us to do with it. In short: we only collect what you choose to send us, and we use it
          to reply to you.
        </p>
      }
      sections={[
        {
          heading: "What we collect",
          body: (
            <>
              <p>When you use the contact form, we receive the details you enter:</p>
              <ul>
                <li>your name and email address</li>
                <li>your company and phone or WhatsApp number, if you add them</li>
                <li>the project types you select and your message</li>
              </ul>
              <p>We don&apos;t ask for anything else, and you don&apos;t need an account to use this site.</p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <p>
              Only to reply to your enquiry, discuss your project and, if we work together, to run that project. We
              don&apos;t sell your information, share it for marketing, or add you to a mailing list.
            </p>
          ),
        },
        {
          heading: "Who processes it",
          body: (
            <>
              <p>To deliver your message reliably, the form sends it through one of these services, trying them in order:</p>
              <ul>
                <li>
                  <strong>Web3Forms</strong>, a form delivery service that emails the message to us
                </li>
                <li>our own email server, if it is set up</li>
                <li>
                  <strong>FormSubmit</strong>, a second form delivery service, used only if the first two fail
                </li>
              </ul>
              <p>
                Messages then arrive in our email inbox. If you choose &ldquo;Send on WhatsApp&rdquo; or tap a WhatsApp link,
                your message goes through WhatsApp under its own privacy policy. The site is hosted on <strong>Vercel</strong>,
                which keeps standard server logs, such as IP addresses, to run and protect the service.
              </p>
            </>
          ),
        },
        {
          heading: "Cookies and tracking",
          body: (
            <p>
              This site doesn&apos;t use cookies, analytics or advertising trackers. If you switch between light and dark
              mode, that choice is saved in your own browser&apos;s storage and never sent to us. Fonts and images load from
              this site, not from third parties.
            </p>
          ),
        },
        {
          heading: "How long we keep it",
          body: (
            <p>
              We keep enquiry emails for as long as we need them to reply and follow up. If we work together, project
              correspondence is kept for the length of the project and our business records. To stop spam, the server
              briefly remembers the IP address of each form submission; this is not stored permanently.
            </p>
          ),
        },
        {
          heading: "Your choices",
          body: (
            <p>
              You can ask us what information we hold about you, ask us to correct it, or ask us to delete it. Email {mail}{" "}
              and we&apos;ll reply within a reasonable time.
            </p>
          ),
        },
        {
          heading: "Other websites",
          body: (
            <p>
              This site links to project websites, LinkedIn, Instagram and WhatsApp. Those sites have their own privacy
              policies, which apply once you visit them.
            </p>
          ),
        },
        {
          heading: "Changes and contact",
          body: (
            <p>
              If we change how the site handles information, we&apos;ll update this page and its date. Questions about
              privacy: {mail}.
            </p>
          ),
        },
      ]}
    />
  );
}

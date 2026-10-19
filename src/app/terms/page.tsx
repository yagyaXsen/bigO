import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { CONTACT_EMAIL } from "@/lib/contact";
import { LegalPage } from "@/components/LegalPage";

const title = "Terms of use — bigO";
const description = "The terms for using the bigO website. Client projects are covered by their own written agreement.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/terms" },
  openGraph: { type: "website", siteName: SITE_NAME, locale: "en_IN", title, description, url: "/terms" },
};

export default function TermsPage() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;
  return (
    <LegalPage
      label="Terms"
      title="Terms of use"
      updated="19 October 2026"
      intro={
        <p>
          These terms cover your use of the bigO website. By using the site you agree to them. They are about the website
          only: any project we do for you is covered by its own written proposal and agreement.
        </p>
      }
      sections={[
        {
          heading: "About this site",
          body: (
            <p>
              The site describes bigO&apos;s services and past work so you can decide whether to get in touch. Nothing on it
              is a binding offer or quote. Scope, timeline and terms for any project are agreed in writing before work
              starts.
            </p>
          ),
        },
        {
          heading: "Examples and illustrations",
          body: (
            <p>
              Some parts of the site, such as the example workflows on the home page, use sample names and data to show how
              our software works. They are illustrations, not records of real clients or results.
            </p>
          ),
        },
        {
          heading: "Our content",
          body: (
            <p>
              The text, design and code of this website belong to bigO, unless stated otherwise. You may share links to it
              and quote short parts with credit, but please don&apos;t copy the site or present it as your own.
            </p>
          ),
        },
        {
          heading: "Client work and third-party names",
          body: (
            <p>
              Projects shown in our work, and their names and screenshots, are included to describe what we built.
              Product names and logos of tools we use belong to their owners and are shown only to describe our stack.
            </p>
          ),
        },
        {
          heading: "Links to other sites",
          body: (
            <p>
              We link to live projects and other websites we don&apos;t control. We aren&apos;t responsible for their content
              or availability.
            </p>
          ),
        },
        {
          heading: "No guarantees",
          body: (
            <p>
              We keep the site accurate and working, but it is provided as it is, and we can&apos;t promise it will always
              be available or error-free. To the extent the law allows, bigO isn&apos;t liable for losses from using the
              website itself.
            </p>
          ),
        },
        {
          heading: "Changes and law",
          body: (
            <p>
              We may update these terms and will change the date above when we do. These terms are governed by the laws of
              India. Questions: {mail}.
            </p>
          ),
        },
      ]}
    />
  );
}

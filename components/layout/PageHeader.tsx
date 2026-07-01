import Link from "next/link";

export default function PageHeader() {
  return (
    <header
      className="
        absolute
        top-0
        left-0
        right-0

        z-50

        px-6
        md:px-12
        lg:px-20

        py-8
      "
    >
      <div
        className="
          flex
          justify-between
          items-center
        "
      >
        <Link
          href="/"
          className="
            uppercase
            tracking-[0.3em]

            text-sm

            text-[#B97D7B]

            transition-all
            duration-500

            hover:scale-105
            hover:-translate-y-1
          "
        >
          Back Home
        </Link>

        <p
          className="
            text-sm

            tracking-[0.3em]

            uppercase

            text-[#928E5E]
          "
        >
          Contact Archive
        </p>
      </div>
    </header>
  );
}

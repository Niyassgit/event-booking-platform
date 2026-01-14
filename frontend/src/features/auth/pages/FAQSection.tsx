import React from "react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(null);
  const faqsData = [
    {
      question: "What types of events can I manage on this platform?",
      answer:
        "You can manage all kinds of events including weddings, corporate events, conferences, birthday parties, concerts, and private gatherings — all from one dashboard.",
    },
    {
      question: "Can I book venues and services in one place?",
      answer:
        "Yes. You can search, compare, and book venues, caterers, decorators, photographers, DJs, and other event services from a single platform.",
    },
    {
      question: "How does the booking and availability system work?",
      answer:
        "Our real-time availability system shows only services and venues that are available on your selected date, helping you avoid double bookings and last-minute surprises.",
    },
    {
      question: "Is online payment and booking confirmation supported?",
      answer:
        "Absolutely. Secure online payments are supported, and instant booking confirmations are sent to both organizers and service providers.",
    },
    {
      question: "Can vendors manage their own listings and bookings?",
      answer:
        "Yes. Vendors get a dedicated dashboard where they can manage profiles, pricing, availability, bookings, and communicate directly with customers.",
    },
  ];

  return (
    <>
      <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                * {
                    font-family: 'Poppins', sans-serif;
                }
            `}</style>
      <div className="flex flex-col items-center text-center text-slate-800 px-3">
        <p className="text-base font-medium text-slate-600">FAQ</p>
        <h1 className="text-3xl md:text-4xl font-semibold mt-2">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-500 mt-4 max-w-sm">
          Proactively answering FAQs boosts user confidence and cuts down on
          support tickets.
        </p>
        <div className="max-w-xl w-full mt-6 flex flex-col gap-4 items-start text-left">
          {faqsData.map((faq, index) => (
            <div key={index} className="flex flex-col items-start w-full">
              <div
                className="flex items-center justify-between w-full cursor-pointer bg-gradient-to-r from-indigo-50 to-white border border-indigo-100 p-4 rounded"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h2 className="text-sm">{faq.question}</h2>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${
                    openIndex === index ? "rotate-180" : ""
                  } transition-all duration-500 ease-in-out`}
                >
                  <path
                    d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p
                className={`text-sm text-slate-500 px-4 transition-all duration-500 ease-in-out ${
                  openIndex === index
                    ? "opacity-100 max-h-[300px] translate-y-0 pt-4"
                    : "opacity-0 max-h-0 -translate-y-2"
                }`}
              >
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FAQSection;

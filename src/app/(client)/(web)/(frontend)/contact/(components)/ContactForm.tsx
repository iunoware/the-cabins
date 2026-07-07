"use client";

import { useEffect, useRef } from "react";
import { Send } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

gsap.registerPlugin(ScrollTrigger);

const schema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(8, "Phone number is required"),
  email: z.string().email("Enter a valid email"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(10, "Message is too short"),
});

type FormData = z.infer<typeof schema>;

export default function ContactForm() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".quote-card", {
        x: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".form-item", {
        opacity: 0,
        y: 25,
        stagger: 0.08,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".quote-card",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <div
      ref={sectionRef}
      className="quote-card rounded-[32px] border border-zinc-200 bg-white p-10 shadow-xl"
    >
      <h2 className="text-4xl font-black text-zinc-900">
        Request a Free Quote
      </h2>

      <p className="mt-2 text-zinc-500">
        Fill in the form and we'll get back to you shortly.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 space-y-5"
      >
        {/* Full Name */}

        <div className="form-item">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Full Name
          </label>

          <input
            {...register("fullName")}
            placeholder="Your full name"
            className="h-14 w-full rounded-xl border border-zinc-200 px-5 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
          />

          {errors.fullName && (
            <p className="mt-2 text-sm text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Phone */}

        <div className="form-item">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Phone Number
          </label>

          <input
            {...register("phone")}
            placeholder="+971 5x xxx xxxx"
            className="h-14 w-full rounded-xl border border-zinc-200 px-5 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
          />

          {errors.phone && (
            <p className="mt-2 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>

        {/* Email */}

        <div className="form-item">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Email Address
          </label>

          <input
            {...register("email")}
            placeholder="you@example.com"
            className="h-14 w-full rounded-xl border border-zinc-200 px-5 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
          />

          {errors.email && (
            <p className="mt-2 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Subject */}

        <div className="form-item">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Subject
          </label>

          <select
            {...register("subject")}
            defaultValue=""
            className="h-14 w-full rounded-xl border border-zinc-200 bg-white px-5 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
          >
            <option value="" disabled>
              Select a subject
            </option>

            <option>Portable Cabin</option>
            <option>Office Cabin</option>
            <option>Accommodation Cabin</option>
            <option>Container Office</option>
            <option>Custom Building</option>
            <option>General Enquiry</option>
          </select>

          {errors.subject && (
            <p className="mt-2 text-sm text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Message */}

        <div className="form-item">
          <label className="mb-2 block text-sm font-semibold text-zinc-700">
            Your Message
          </label>

          <textarea
            {...register("message")}
            rows={6}
            placeholder="Tell us about your project..."
            className="w-full rounded-xl border border-zinc-200 px-5 py-4 outline-none transition-all focus:border-red-500 focus:ring-4 focus:ring-red-100"
          />

          {errors.message && (
            <p className="mt-2 text-sm text-red-500">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Button */}

        <button
          type="submit"
          className="group flex h-14 w-full items-center justify-center gap-3 rounded-full bg-red-600 text-lg font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-red-700"
        >
          Send Message

          <Send
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>
      </form>
    </div>
  );
}
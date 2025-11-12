import {
  Smartphone,
  X,
  Heart,
  TrendingDown,
  Users,
  MessageCircle,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
gsap.registerPlugin(ScrollTrigger);
function Problem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sideComponentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        pin: true,
      },
    });
    if (paragraphRef.current) {
      const split = new SplitType(paragraphRef.current, { types: "words" });
      tl.from(split.words, { opacity: 0, y: 20, stagger: 0.05 });
    }
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: "chars" });
      gsap.from(split.chars, {
        opacity: 0.2,
        stagger: 0.1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      });
    }
    if (sideComponentRef.current) {
      gsap.to(sideComponentRef.current, {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }
    return () => {
      tl.kill();
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      data-scroll-section
      data-section="problem"
      className="min-h-screen flex items-center justify-center py-24 md:py-32 relative bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
    >
      {" "}
      {/* Decorative background elements */}{" "}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {" "}
        <div
          data-speed="0.5"
          className="absolute top-1/4 right-10 w-64 h-64 bg-gray-200 rounded-full blur-3xl opacity-30"
        />{" "}
        <div
          data-speed="0.8"
          className="absolute bottom-1/3 left-10 w-80 h-80 bg-slate-200 rounded-full blur-3xl opacity-30"
        />{" "}
      </div>{" "}
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        {" "}
        <div className="grid md:grid-cols-2 gap-20 lg:gap-24 items-center">
          {" "}
          {/* ========== LEFT SIDE - TEXT CONTENT ========== */}{" "}
          <div data-speed="1.2">
            {" "}
            <div className="space-y-12" data-animation="problem-text">
              {" "}
              {/* Badge */}{" "}
              <div className="inline-block px-6 py-2 bg-rose-500 text-white rounded-full text-sm tracking-wide font-medium shadow-lg mb-4">
                {" "}
                THE PROBLEM{" "}
              </div>{" "}
              {/* Main headline */}{" "}
              <h2
                ref={headingRef}
                className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {" "}
                We stopped meeting new people{" "}
                <span className="inline-block">naturally.</span>{" "}
              </h2>{" "}
              {/* Content blocks */}{" "}
              <div className="space-y-8 text-lg md:text-xl text-gray-600 leading-relaxed">
                {" "}
                {/* First point - How it used to be */}{" "}
                <p
                  ref={paragraphRef}
                  className="flex items-start space-x-4 mb-6"
                >
                  {" "}
                  <span className="text-rose-400 mt-1 text-2xl flex-shrink-0">
                    {" "}
                    ✓{" "}
                  </span>{" "}
                  <span className="inline-block">
                    {" "}
                    We used to meet through{" "}
                    <strong className="text-gray-900">moments</strong> — a
                    shared laugh at a coffee shop, a spontaneous plan at the
                    gym, a common hobby at a meetup.{" "}
                  </span>{" "}
                </p>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          {/* ========== RIGHT SIDE - VISUAL MOCKUP ========== */}{" "}
          <div ref={sideComponentRef} className="relative" data-speed="0.8">
            {" "}
            <div className="relative h-[600px] md:h-[700px] flex items-center justify-center">
              {" "}
              {/* Background shadow layers with animation hooks */}{" "}
              <div
                data-animation="phone-layer"
                className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-3xl transform rotate-6 opacity-40 blur-sm"
              />{" "}
              <div
                data-animation="phone-layer"
                className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 rounded-3xl transform -rotate-3 opacity-40 blur-sm"
              />{" "}
              {/* Main phone mockup card */}{" "}
              <div className="relative bg-white rounded-3xl p-8 md:p-10 lg:p-12 shadow-2xl flex flex-col items-center justify-center space-y-6 md:space-y-8 w-full max-w-md border border-gray-200">
                {" "}
                {/* Phone icon with swipe indicators - animation hook */}{" "}
                <div data-animation="phone-icon" className="relative">
                  {" "}
                  <Smartphone
                    className="w-32 h-32 text-gray-400"
                    strokeWidth={1}
                  />{" "}
                  {/* Left swipe (reject) */}{" "}
                  <div className="absolute -right-6 top-1/4 animate-pulse">
                    {" "}
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shadow-md border-2 border-red-200">
                      {" "}
                      <X className="w-5 h-5 text-red-600" />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Right swipe (like) */}{" "}
                  <div
                    className="absolute -left-6 top-1/4 animate-pulse"
                    style={{ animationDelay: "0.5s" }}
                  >
                    {" "}
                    <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center shadow-md border-2 border-rose-200">
                      {" "}
                      <Heart className="w-5 h-5 text-rose-600" />{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Notification badge */}{" "}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                    {" "}
                    99+{" "}
                  </div>{" "}
                </div>{" "}
                {/* Mock app stats */}{" "}
                <div className="text-center space-y-4 w-full">
                  {" "}
                  <div className="grid grid-cols-2 gap-3">
                    {" "}
                    {/* Swipes stat */}{" "}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      {" "}
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        {" "}
                        <Users className="w-4 h-4 text-gray-400" />{" "}
                      </div>{" "}
                      <div className="text-3xl font-bold text-gray-400">
                        {" "}
                        500+{" "}
                      </div>{" "}
                      <div className="text-xs text-gray-500 mt-1">
                        {" "}
                        Swipes today{" "}
                      </div>{" "}
                    </div>{" "}
                    {/* Matches stat */}{" "}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                      {" "}
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        {" "}
                        <MessageCircle className="w-4 h-4 text-gray-400" />{" "}
                      </div>{" "}
                      <div className="text-3xl font-bold text-gray-400">12</div>{" "}
                      <div className="text-xs text-gray-500 mt-1">Matches</div>{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Connection quality */}{" "}
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    {" "}
                    <div className="flex items-center justify-center space-x-2">
                      {" "}
                      . <TrendingDown className="w-5 h-5 text-red-500" />{" "}
                      <div className="text-2xl font-bold text-red-600">0</div>{" "}
                    </div>{" "}
                    <div className="text-sm text-red-700 mt-1 font-medium">
                      {" "}
                      Real connections{" "}
                    </div>{" "}
                  </div>{" "}
                  {/* Status message */}{" "}
                  <div className="pt-4 border-t border-gray-200">
                    {" "}
                    <p className="text-gray-500 text-base font-medium italic">
                      {" "}
                      "Scrolling... But feeling disconnected"{" "}
                    </p>{" "}
                  </div>{" "}
                </div>{" "}
                {/* Arrow pointing to solution (visible on larger screens) */}{" "}
                <div className="hidden md:block absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                  {" "}
                  <div className="bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl border-2 border-white animate-pulse">
                    {" "}
                    There's a better way →{" "}
                  </div>{" "}
                </div>{" "}
              </div>{" "}
              {/* Floating decorative elements */}{" "}
              <div
                data-speed="1.5"
                className="absolute top-10 left-0 w-16 h-16 bg-gray-300/30 rounded-full blur-xl"
              />{" "}
              <div
                data-speed="0.5"
                className="absolute bottom-10 right-0 w-20 h-20 bg-gray-300/30 rounded-full blur-xl"
              />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {/* Bottom CTA indicator (mobile) */}{" "}
        <div className="md:hidden text-center mt-12">
          {" "}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-500 to-amber-500 text-white px-6 py-3 rounded-full text-sm font-bold shadow-xl animate-pulse">
            {" "}
            <span>There's a better way</span> <span>→</span>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </section>
  );
}
export default Problem;

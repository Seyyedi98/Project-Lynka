"use client";

import { sendContactMessage } from "@/actions/contact-us";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { contactMeFormSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";
import {
  Loader2,
  Mail,
  MessageSquare,
  Phone,
  Send,
  Share2,
  User
} from "lucide-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const fade = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const ContactUs = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactMeFormSchema),
    defaultValues: {
      title: "",
      message: "",
    },
  });

  const { id } = useCurrentUser();

  const onSubmit = async (data) => {
    try {
      await sendContactMessage({
        userId: id,
        title: data.title,
        message: data.message,
      });

      toast.success("پیام شما با موفقیت ارسال شد.");
      reset();
    } catch (error) {
      toast.error("خطایی در ارسال پیام رخ داد. لطفاً مجدداً تلاش کنید.");
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 pb-8 pt-40 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 sm:mx-4 sm:mr-20 xl:pr-6">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-white md:text-4xl"
        >
          تماس با ما
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mt-4 text-white"
        >
          پیام خود را برای ما ارسال کنید
        </motion.p>
      </div>

      {/* Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sm:mx-4 sm:mr-20 xl:pr-6"
      >
        <Card className="border-0 bg-background/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5" />
              فرم تماس
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <motion.div {...fade}>
                  <div className="relative">
                    <User className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      {...register("title")}
                      placeholder="عنوان پیام"
                      className="h-10 pl-4 pr-10"
                      name="title"
                    />
                    {errors.title && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div {...fade} transition={{ delay: 0.1 }}>
                  <div className="relative">
                    <MessageSquare className="absolute right-3 top-3 h-4 w-4 text-muted-foreground" />

                    <Textarea
                      {...register("message")}
                      as="textarea"
                      rows={5}
                      placeholder="متن پیام"
                      className="pl-4 pr-10"
                      name="message"
                    />

                    {errors.message && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                </motion.div>

                <motion.div
                  {...fade}
                  transition={{ delay: 0.2 }}
                  className="pt-2"
                >
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="md"
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        در حال ارسال...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        ارسال پیام
                      </>
                    )}
                  </Button>
                </motion.div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-1 gap-6 sm:mx-4 sm:mr-20 sm:grid-cols-2 xl:pr-6"
      >
        <Card className="border-0 bg-gradient-to-r from-primary to-indigo-600">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-indigo-100">
                  ارتباط از طریق ایمیل
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  info@lynka.ir
                </p>
                <p className="mt-1 text-xs text-indigo-200">
                  پاسخگویی در کمتر از ۲۴ ساعت
                </p>
              </div>
              <Phone className="h-8 w-8 text-indigo-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 bg-gradient-to-r from-pink-500 to-pink-600">
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-pink-100">
                  ما را در شبکه‌های اجتماعی دنبال کنید
                </p>
                <Share2 className="h-8 w-8 translate-y-5 text-pink-200" />
              </div>

              <div className="flex justify-center gap-6">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/bio_lynka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramLogoIcon className="h-7 w-7 text-white transition-transform hover:scale-110" />
                </a>

                {/* Telegram */}
                <a
                  href="https://t.me/bio_lynka"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Send className="h-7 w-7 text-white transition-transform hover:scale-110" />
                </a>

                {/* WhatsApp */}
                {/* <a
                  href="https://wa.me/989123456789"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-7 w-7 text-white transition-transform hover:scale-110" />
                </a> */}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ContactUs;

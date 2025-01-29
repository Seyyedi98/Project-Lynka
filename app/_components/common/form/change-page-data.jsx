"use client";

const { zodResolver } = require("@hookform/resolvers/zod");
const { useForm } = require("react-hook-form");

const UpdatePageData = () => {
  const form = useForm({
    // resolver: zodResolver(),
    defaultValues: {
      uri: "",
      title: "",
      description: "",
      favicon: "",
    },
  });
};

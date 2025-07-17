/* eslint-disable @next/next/no-img-element */
import {
  InstagramLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from "@radix-ui/react-icons";
import {
  IconBrandDiscord,
  IconBrandGithub,
  IconBrandLine,
  IconBrandMessenger,
  IconBrandTelegram,
  IconBrandWechat,
  IconBrandWhatsapp,
} from "@tabler/icons-react";
import { FacebookIcon, YoutubeIcon } from "lucide-react";
import {
  FaDiscord,
  FaFacebook,
  FaFacebookMessenger,
  FaGithub,
  FaInstagram,
  FaLine,
  FaLinkedin,
  FaSignal,
  FaSkype,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const socialPlatforms = [
  {
    icon: <IconBrandTelegram />,
    background: "#0088cc",
    value: "telegram",
    urlPrefix: "tg://resolve?domain=",
    webPrefix: "https://t.me/",
  },
  {
    name: "WhatsApp",
    icon: <IconBrandWhatsapp />,
    background: "#25D326",
    value: "whatsapp",
    urlPrefix: "whatsapp://send?phone=",
    webPrefix: "https://wa.me/",
  },
  {
    name: "Bale",
    icon: (
      <img
        src="/icons/socials/bale.svg"
        alt="Bale"
        style={{ width: "32px", height: "32px" }}
      />
    ),
    background: "#e3e3e3",
    value: "bale",
    urlPrefix: "bale://",
    webPrefix: "https://bale.ai/",
  },
  {
    name: "Soroush",
    icon: (
      <img
        src="/icons/socials/soroush.svg"
        alt="Bale"
        style={{ width: "32px", height: "32px" }}
      />
    ),
    background: "#2A5F8A",
    value: "soroush",
    urlPrefix: "soroush://",
    webPrefix: "https://splus.ir/",
  },
  {
    name: "Instagram",
    icon: <FaInstagram />,
    background: "#dc2743",
    // "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    value: "instagram",
    urlPrefix: "instagram://user?username=",
    webPrefix: "https://instagram.com/",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    background: "#1DA1F2",
    value: "twitter",
    urlPrefix: "twitter://user?screen_name=",
    webPrefix: "https://twitter.com/",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedin />,
    background: "#0077b5",
    value: "linkedin",
    urlPrefix: "linkedin://profile/",
    webPrefix: "https://linkedin.com/in/",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    background: "#1877f2",
    value: "facebook",
    urlPrefix: "fb://profile/",
    webPrefix: "https://facebook.com/",
  },
  {
    name: "Facebook Messenger",
    icon: <FaFacebookMessenger />,
    background: "#006AFF",
    value: "messenger",
    urlPrefix: "fb-messenger://user/",
    webPrefix: "https://m.me/",
  },
  {
    name: "YouTube",
    icon: <FaYoutube />,
    background: "#ff0000",
    value: "youtube",
    urlPrefix: "vnd.youtube://channel/",
    webPrefix: "https://youtube.com/",
  },
  {
    name: "Discord",
    icon: <FaDiscord />,
    background: "#5865F2",
    value: "discord",
    urlPrefix: "discord://",
    webPrefix: "https://discord.com/users/",
  },
  {
    name: "Skype",
    icon: <FaSkype />, // add icon
    background: "#00AFF0",
    value: "skype",
    urlPrefix: "skype:",
    webPrefix: "https://web.skype.com/",
  },

  {
    name: "Line",
    icon: <FaLine />,
    background: "#00C300",
    value: "line",
    urlPrefix: "line://",
    webPrefix: "https://line.me/",
  },
  {
    name: "Eitaa",
    icon: <IconBrandTelegram />,
    background: "#00AEEF",
    value: "eitaa",
    urlPrefix: "eitaa://",
    webPrefix: "https://eitaa.com/",
  },
  {
    name: "Gap",
    icon: <IconBrandTelegram />,
    background: "#00B0B9",
    value: "gap",
    urlPrefix: "gap://",
    webPrefix: "https://gap.im/",
  },
  {
    name: "Rubika",
    icon: <IconBrandTelegram />,
    background: "#D72F4E",
    value: "rubika",
    urlPrefix: "rubika://",
    webPrefix: "https://rubika.ir/",
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    background: "#181717",
    value: "github",
    urlPrefix: "github://user/",
    webPrefix: "https://github.com/",
  },
  {
    name: "Signal",
    icon: <FaSignal />, // add icon later
    background: "#2592E9",
    value: "signal",
    urlPrefix: "sgnl://",
    webPrefix: "https://signal.me/",
  },
  {
    name: "WeChat",
    icon: <IconBrandWechat />,
    background: "#07C160",
    value: "wechat",
    urlPrefix: "weixin://",
    webPrefix: "https://wechat.com/",
  },
];

export default socialPlatforms;

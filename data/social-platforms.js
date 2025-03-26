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
import { FacebookIcon, VibrateIcon, YoutubeIcon } from "lucide-react";

const socialPlatforms = [
  {
    name: "Telegram",
    icon: <IconBrandTelegram />,
    background: "#0088cc",
    value: "telegram",
    urlPrefix: "tg://resolve?domain=",
    webPrefix: "https://t.me/",
  },
  {
    name: "WhatsApp",
    icon: <IconBrandWhatsapp />,
    background: "#25D366",
    value: "whatsapp",
    urlPrefix: "whatsapp://send?phone=",
    webPrefix: "https://wa.me/",
  },
  {
    name: "Bale",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#2A5F8A",
    value: "bale",
    urlPrefix: "bale://",
    webPrefix: "https://bale.ai/",
  },
  {
    name: "Soroush",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#5C45BA",
    value: "soroush",
    urlPrefix: "soroush://",
    webPrefix: "https://splus.ir/",
  },
  {
    name: "Instagram",
    icon: <InstagramLogoIcon />,
    background:
      "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
    value: "instagram",
    urlPrefix: "instagram://user?username=",
    webPrefix: "https://instagram.com/",
  },
  {
    name: "Twitter",
    icon: <TwitterLogoIcon />,
    background: "#1DA1F2",
    value: "twitter",
    urlPrefix: "twitter://user?screen_name=",
    webPrefix: "https://twitter.com/",
  },
  {
    name: "LinkedIn",
    icon: <LinkedInLogoIcon />,
    background: "#0077b5",
    value: "linkedin",
    urlPrefix: "linkedin://profile/",
    webPrefix: "https://linkedin.com/in/",
  },
  {
    name: "Facebook",
    icon: <FacebookIcon />,
    background: "#1877f2",
    value: "facebook",
    urlPrefix: "fb://profile/",
    webPrefix: "https://facebook.com/",
  },
  {
    name: "Facebook Messenger",
    icon: <IconBrandMessenger />,
    background: "#006AFF",
    value: "messenger",
    urlPrefix: "fb-messenger://user/",
    webPrefix: "https://m.me/",
  },
  {
    name: "YouTube",
    icon: <YoutubeIcon />,
    background: "#ff0000",
    value: "youtube",
    urlPrefix: "vnd.youtube://channel/",
    webPrefix: "https://youtube.com/",
  },
  {
    name: "Discord",
    icon: <IconBrandDiscord />,
    background: "#5865F2",
    value: "discord",
    urlPrefix: "discord://",
    webPrefix: "https://discord.com/users/",
  },
  {
    name: "Skype",
    icon: <IconBrandTelegram />, // add icon
    background: "#00AFF0",
    value: "skype",
    urlPrefix: "skype:",
    webPrefix: "https://web.skype.com/",
  },
  {
    name: "Kik",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#82CE23",
    value: "kik",
    urlPrefix: "kik://",
    webPrefix: "https://www.kik.com/",
  },
  {
    name: "Viber",
    icon: <VibrateIcon />,
    background: "#7360F2",
    value: "viber",
    urlPrefix: "viber://chat?number=",
    webPrefix: "https://chats.viber.com/",
  },
  {
    name: "Line",
    icon: <IconBrandLine />,
    background: "#00C300",
    value: "line",
    urlPrefix: "line://",
    webPrefix: "https://line.me/",
  },
  {
    name: "Eitaa",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#00AEEF",
    value: "eitaa",
    urlPrefix: "eitaa://",
    webPrefix: "https://eitaa.com/",
  },
  {
    name: "Gap",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#00B0B9",
    value: "gap",
    urlPrefix: "gap://",
    webPrefix: "https://gap.im/",
  },
  {
    name: "Rubika",
    icon: <IconBrandTelegram />, // You'll need to create or find this icon
    background: "#D72F4E",
    value: "rubika",
    urlPrefix: "rubika://",
    webPrefix: "https://rubika.ir/",
  },
  {
    name: "GitHub",
    icon: <IconBrandGithub />,
    background: "#181717",
    value: "github",
    urlPrefix: "github://user/",
    webPrefix: "https://github.com/",
  },
  {
    name: "Signal",
    icon: <IconBrandTelegram />, // add icon later
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

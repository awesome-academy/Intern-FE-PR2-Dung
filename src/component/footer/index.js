import "./style.scss";
import React from "react";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();
  const shopUs = {
    title: t("SHOP US"),
    content: [
      t("Shop Men"),
      t("Shop Women"),
      t("Best Bellers"),
      t("New Arrivals"),
    ],
  };
  const aboutUs = {
    title: t("ABOUT US"),
    content: [t("About Us"), t("Our History"), t("Contact Us")],
  };
  const contact = {
    title: t("CONTACT"),
    content: [
      t("Marotic Supply"),
      "Shopilaunch@gmail.com",
      "Phone: (646) 663-4575",
      "Fax: (646) 968-0608",
    ],
  };
  const newLetter = {
    title: t("NEWLETTERS"),
    content: [t("contentfooter")],
  };
  return (
    <footer className="footer">
      <div className="footer__block container">
        <div className="wrap row">
          <FooterBlockItem data={shopUs} />
          <FooterBlockItem data={aboutUs} />
          <FooterBlockItem data={contact} />
          <FooterBlockItem data={newLetter} />
        </div>
      </div>
    </footer>
  );
}

function FooterBlockItem(props) {
  return (
    <div className="footer__block-item col-12 col-md-6 col-xl-3">
      <h6 className="footer__block--title mt-3 mb-2">{props.data.title}</h6>
      {props.data.content.map((item) => (
        <li className="footer__block--itemLink" key={item}>
          {item}
        </li>
      ))}
    </div>
  );
}

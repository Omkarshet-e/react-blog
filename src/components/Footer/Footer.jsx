import { Link } from "react-router-dom";

function Footer() {
  const companyItems = [
    {
      path: "/",
      item: "Features",
    },
    {
      path: "/",
      item: "Pricing",
    },
    {
      path: "/",
      item: "Affiliate Program",
    },
    {
      path: "/",
      item: "Press Kit",
    },
  ];
  const supportItems = [
    {
      path: "/",
      item: "Account",
    },
    {
      path: "/",
      item: "Help",
    },
    {
      path: "/",
      item: "Contact Us",
    },
    {
      path: "/",
      item: "Customer Support",
    },
  ];
  const legalItems = [
    {
      path: "/",
      item: "Terms & Conditions",
    },
    {
      path: "/",
      item: "Privacy Policy",
    },
    {
      path: "/",
      item: "Licensing",
    },
  ];
  // md:gap-16 sm:gap-12 space-x-2
  return (
    <div className="mt-0  bg-dark-primary-black text-primary-pink/85 ">
      <div className="lg:max-w-[88%] lg:mx-auto w-full px-8 max-sm:px-0 max-sm:mt-0">
        <div className="flex items-start max-md:items-center max-md:flex-col ">
          <div className="left flex gap-3 items-center p-2 max-md:pb-1 basis-2/6">
            <img
              src="/assets/react-logo-dark.png"
              className="w-10"
              alt="React Blog logo"
            />
            <h3 className="text-primary-pink">React Blog</h3>
          </div>
          <div className="right p-2 max-sm:p-1 pb-2 grow flex max-md:divide-x-2 max-md:divide-white/20 justify-end max-md:justify-between lg:gap-20 md:gap-14 max-md:text-center">
            <div className="company space-y-2 max-md:text-sm max-sm:text-[0.7rem] max-md:px-5 max-sm:px-2 ">
              <h2>Company</h2>
              <div>
                {companyItems.map((item) => {
                  return (
                    <div
                      className="md:text-sm font-light text-primary-pink/70 hover:text-primary-pink"
                      key={(item.path, item.item)}
                    >
                      <Link>{item.item}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="support space-y-2 max-md:text-sm max-sm:text-[0.7rem] max-md:px-5 max-sm:px-2">
              <h2>Support</h2>
              <div>
                {supportItems.map((item) => {
                  return (
                    <div
                      className="md:text-sm font-light text-primary-pink/70 hover:text-primary-pink"
                      key={(item.path, item.item)}
                    >
                      <Link>{item.item}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="legal space-y-2 max-md:text-sm max-sm:text-[0.7rem] max-md:px-5 max-sm:px-2">
              <h2>Legals</h2>
              <div>
                {legalItems.map((item) => {
                  return (
                    <div
                      className="md:text-sm font-light text-primary-pink/70 hover:text-primary-pink"
                      key={(item.path, item.item)}
                    >
                      <Link>{item.item}</Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="text-center text-xs mt-1 mb-[2px] border-t-2 border-white/20 py-1">
          <h1>&copy; Copyright Omkar Shete .</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;

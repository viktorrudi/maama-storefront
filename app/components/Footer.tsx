import { NavLink } from "@remix-run/react";
import type { HeaderQuery } from "storefrontapi.generated";

interface FooterProps {
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({ header, publicStoreDomain }: FooterProps) {
  return (
    <footer className="footer">
      {header.shop.primaryDomain?.url && (
        <FooterMenu
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      )}
    </footer>
  );
}

function FooterMenu({
  primaryDomainUrl,
  publicStoreDomain,
}: {
  primaryDomainUrl: FooterProps["header"]["shop"]["primaryDomain"]["url"];
  publicStoreDomain: string;
}) {
  return (
    <nav className="footer-menu" role="navigation">
      {FALLBACK_FOOTER_MENU.items.map((item) => {
        if (!item.url) return null;
        // if the url is internal, we strip the domain
        const url =
          item.url.includes("myshopify.com") ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith("/");
        return isExternal ? (
          <a href={url} key={item.id} rel="noopener noreferrer" target="_blank">
            {item.title}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: "gid://shopify/Menu/199655620664",
  items: [
    {
      id: "gid://shopify/MenuItem/461633060920",
      resourceId: "gid://shopify/ShopPolicy/23358046264",
      tags: [],
      title: "Privacy Policy",
      type: "SHOP_POLICY",
      url: "/policies/privacy-policy",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461633093688",
      resourceId: "gid://shopify/ShopPolicy/23358013496",
      tags: [],
      title: "Refund Policy",
      type: "SHOP_POLICY",
      url: "/policies/refund-policy",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461633126456",
      resourceId: "gid://shopify/ShopPolicy/23358111800",
      tags: [],
      title: "Shipping Policy",
      type: "SHOP_POLICY",
      url: "/policies/shipping-policy",
      items: [],
    },
    {
      id: "gid://shopify/MenuItem/461633159224",
      resourceId: "gid://shopify/ShopPolicy/23358079032",
      tags: [],
      title: "Terms of Service",
      type: "SHOP_POLICY",
      url: "/policies/terms-of-service",
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? "bold" : undefined,
    color: isPending ? "grey" : "white",
  };
}

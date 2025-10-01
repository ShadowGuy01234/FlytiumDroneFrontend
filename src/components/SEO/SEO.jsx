import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEO = ({
  title = "Flytium Drones | Drone Training, Workshops, Repair & E-Commerce",
  description = "Flytium Drones offers professional drone training, DGCA drone pilot workshops, drone repair services, and e-commerce for drone & IoT components in India.",
  keywords = "drone training, DGCA certified, drone workshop, drone repair, buy drones India",
  image = "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
  url = "https://flytiumdrones.com",
  type = "website",
  author = "Flytium Drones Pvt Ltd",
  twitterHandle = "@FlytiumDrone",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noIndex = false,
}) => {
  const baseUrl = "https://flytiumdrones.com";
  const canonicalUrl = url.startsWith("http") ? url : `${baseUrl}${url}`;

  // Generate structured data for organization
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Flytium Drones",
    url: baseUrl,
    logo: "https://res.cloudinary.com/dhkpwi9ga/image/upload/v1735826340/gs8gxkiomuxgn6ndjjys.png",
    description:
      "Professional drone training, workshops, repair services, and e-commerce platform",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Gorakhpur",
      addressRegion: "Uttar Pradesh",
      addressCountry: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://facebook.com/flytiumdrone",
      "https://twitter.com/flytiumdrone",
      "https://instagram.com/flytiumdrone",
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      {/* Robots */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <meta name="googlebot" content="index, follow" />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Flytium Drones" />
      <meta property="og:locale" content="en_US" />

      {/* Article specific tags */}
      {publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {section && <meta property="article:section" content={section} />}
      {tags.length > 0 &&
        tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content={twitterHandle} />
      <meta name="twitter:site" content={twitterHandle} />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string,
  author: PropTypes.string,
  twitterHandle: PropTypes.string,
  publishedTime: PropTypes.string,
  modifiedTime: PropTypes.string,
  section: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
  noIndex: PropTypes.bool,
};

export default SEO;

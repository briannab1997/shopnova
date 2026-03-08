import '../../styles/footer.css';

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <button className="footer-back-to-top" onClick={scrollTop}>
        Back to top
      </button>

      <div className="footer-main">
        <div className="footer-col">
          <h4>Get to Know Us</h4>
          <ul>
            <li><a href="#">About ShopNova</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press Center</a></li>
            <li><a href="#">Investor Relations</a></li>
            <li><a href="#">Sustainability</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Shop With Us</h4>
          <ul>
            <li><a href="#">Your Account</a></li>
            <li><a href="#">Your Orders</a></li>
            <li><a href="#">Shipping Rates</a></li>
            <li><a href="#">Returns & Replacements</a></li>
            <li><a href="#">Today's Deals</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Let Us Help You</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Track Your Package</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Cookie Preferences</a></li>
            <li><a href="#">Accessibility</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>ShopNova Programs</h4>
          <ul>
            <li><a href="#">ShopNova Nova Prime</a></li>
            <li><a href="#">Sell on ShopNova</a></li>
            <li><a href="#">Advertise Products</a></li>
            <li><a href="#">Gift Cards</a></li>
            <li><a href="#">ShopNova for Business</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-logo">
          Shop<span>Nova</span>
        </div>
        <div className="footer-bottom-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Consumer Disclosure</a>
          <a href="#">Your Ads Privacy Choices</a>
        </div>
        <p className="footer-copyright">
          &copy; {new Date().getFullYear()} ShopNova. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

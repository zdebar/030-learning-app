export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full p-4 text-center">
      <p className="text-sm">&copy; {currentYear} zdenekbarth.cz</p>
    </footer>
  );
}


const SidebarToggle = () => {
  const [isLightTheme, setIsLightTheme] = useState(true);

  const handleSidebarToggle = () => {
    document.querySelector("#sidebar").classList.toggle("collapsed");
  };

  const handleThemeToggle = () => {
    toggleLocalStorage();
    toggleRootClass();
  };

  const toggleRootClass = () => {
    const current = document.documentElement.getAttribute('data-bs-theme');
    const inverted = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-bs-theme', inverted);
    setIsLightTheme(inverted === 'light');
  };

  const toggleLocalStorage = () => {
    if (isLightTheme) {
      localStorage.removeItem("light");
    } else {
      localStorage.setItem("light", "set");
    }
  };

  useEffect(() => {
    if (isLight()) {
      toggleRootClass();
    }
  }, []);

  const isLight = () => {
    return localStorage.getItem("light");
  };

  return (
    <>
      <button id="sidebar-toggle" onClick={handleSidebarToggle}>Toggle Sidebar</button>
      <button className="theme-toggle" onClick={handleThemeToggle}>Toggle Theme</button>
    </>
  );
};

export default SidebarToggle;

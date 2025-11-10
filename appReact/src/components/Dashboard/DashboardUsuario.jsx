const DashboardUsuario = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cerrarSesion = () => {
    dispatch(desloguear());
    navigate("/");
  };

  const changeLenguage = (e) => {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("lenguage", e.target.value);
  };

  useEffect(() => {
    const container = document.querySelector(".dashboard-root");
    if (!container) return;

    const links = Array.from(
      document.querySelectorAll(".sidebar-nav a[href^='#']")
    );
    const onClick = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const id = href.slice(1);
      const target = document.getElementById(id);
      if (!target) return;

      const containerRect = container.getBoundingClientRect();
      const targetRect = target.getBoundingClientRect();
      const top = targetRect.top - containerRect.top + container.scrollTop;

      container.scrollTo({ top, behavior: "smooth" });
      // update hash without default jump
      try {
        history.replaceState(null, "", `#${id}`);
      } catch (err) {
        /* ignore */
      }
    };
    links.forEach((l) => l.addEventListener("click", onClick));
    return () => links.forEach((l) => l.removeEventListener("click", onClick));
  }, []);

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div
          className="sidebar-header"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "0.5rem",
          }}
        >
          <div className="sidebar-brand">Mi App</div>
          <select
            onChange={changeLenguage}
            defaultValue={actualLenguage}
            style={{ maxWidth: 140 }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
          </select>
        </div>

        <ul className="sidebar-nav">
          <li>
            <a href="#section-celulares">Inicio</a>
            <a href="#section-celulares">Celulares</a>
            <a href="#section-accesorios">Accesorios</a>
            <a href="#section-usuarios">Usuarios</a>
          </li>
        </ul>
        <div className="sidebar-footer">
          <button className="btn btn-danger btn-sm" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="dashboard-root container mb-5">
          <div id="alerts" />
          {/* Celulares */}
          <section id="section-celulares" className="mb-5">
            <h2>Celulares</h2>
            <div className="row">
              <div className="col-md-4 col-12">
                <AltaCelular />
              </div>
              <div className="col-md-8 col-12">
                <ListarCelular />
              </div>
              <div className="col-md-12 col-12">
                <EditarCelular />
              </div>
            </div>
          </section>
          {/* Accesorios */}
          <section id="section-accesorios" className="mb-5">
            <h2>Accesorios</h2>
            <div className="row">
              <div className="col-md-4 col-12">
                <CrearAccesorio />
              </div>
              <div className="col-md-8 col-12">
                <ListarAccesorio />
              </div>
              <div className="col-md-12 col-12">
                <EditarAccesorio />
              </div>
            </div>
          </section>

          {/* Usuarios */}
          <section id="section-usuarios" className="mb-5"></section>
        </div>
      </main>
    </div>
  );
};

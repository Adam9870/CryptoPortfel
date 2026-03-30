function PageContainer({ title, subtitle, children, actions }) {
  return (
    <div className="page-container">
      <header className="page-header">
        <div>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
        </div>
        {actions && <div>{actions}</div>}
      </header>
      {children}
    </div>
  );
}

export default PageContainer;

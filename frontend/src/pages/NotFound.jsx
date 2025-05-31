const NotFound = () => {
  return (
    <div className="container">
      <h2>Error 404</h2>
      <p>La página que buscas no existe.</p>
      <p>¿Quizás querías ir a <a href="/login">Iniciar sesión</a> o <a href="/home">tus tareas</a>?</p>
    </div>
  );
};

export default NotFound;

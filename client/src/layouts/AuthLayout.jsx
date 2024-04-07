import { Outlet, useNavigate } from "react-router-dom";


export default function AuthLayout() {


  return (
   
      <main>
        <section></section>
        <section>
          <Outlet />
        </section>
      </main>
    
  );
}

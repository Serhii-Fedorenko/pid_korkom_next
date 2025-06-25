import NavBar from "@/components/NavBar";
import { AuthProvider } from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext";
import "./globals.css";

export const metadata = {
  title: "Pid korkom",
  description:
    "Усе про алкоголь: технічні особливості виготовлення дистилятів, лікерів, вермутів, настоянок, вина. Їхні історія, цікаві факти.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ModalProvider>
            <NavBar />
          </ModalProvider>
          <main>{children}</main>
          <div id="modal-root"></div>
        </AuthProvider>
      </body>
    </html>
  );
}

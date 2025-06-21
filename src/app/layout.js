import NavBar from "@/components/NavBar";
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
        <NavBar />
        <main>{children}</main>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}

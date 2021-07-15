export default function ({ store, redirect }) {
    if (process.client && !localStorage.getItem('token')) return redirect("/login");
  }
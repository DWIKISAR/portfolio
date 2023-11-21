function submitData() {
  let name = document.getElementById("input-name").value;
  let email = document.getElementById("input-email").value;
  let number = document.getElementById("input-number").value;
  let subject = document.getElementById("input-subject").value;
  let message = document.getElementById("input-message").value;

  if (name === "") {
    return alert("Name must be filled!");
  } else if (email === "") {
    return alert("Email must be filled!");
  } else if (number === "") {
    return alert("Number must be filled!");
  } else if (subject === "") {
    return alert("Subject must be filled!");
  } else if (message === "") {
    return alert("Message must be filled!");
  }

  const myEmail = "dwikysholihin2512@gmail.com";

  let a = document.createElement("a");
  a.href = `mailto:${myEmail}?subject=${subject}&body=halo, nama saya &{name}, ${message}. Tolong kontak saya di nomor ${number} atau email saya di ${email}`;
  a.click();

  let messagers = {
    nama: name,
    email: email,
    phone_number: number,
    subject: subject,
    message: message,
  };

  console.log(messagers);
}

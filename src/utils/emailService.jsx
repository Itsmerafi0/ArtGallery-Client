import emailjs from "emailjs-com";

export const sendEmail = async (formData) => {
  const templateParams = {
    to_name: formData.name, // Pastikan ini sesuai dengan variabel di template
    from_name: formData.name,
    reply_to: formData.email,
    message: formData.comment,
  };

  try {
    await emailjs.send(
      "service_gpkcsnl",
      "template_pabcwcu",
      templateParams,
      "_exp36cSvdWUy21Eo",
    );
  } catch (error) {
    console.error("Gagal mengirim email", error);
    throw error;
  }
};

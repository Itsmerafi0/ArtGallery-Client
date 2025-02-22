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
      "service_ef02bnj",
      "template_pabcwcu",
      templateParams,
      "-yt4KAQcFam_-1GW4",
    );
  } catch (error) {
    console.error("Gagal mengirim email", error);
    throw error;
  }
};

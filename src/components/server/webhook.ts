"use server";

// WebHook送信関数
export const sendWebhook = async (
  _webhookUrl: string,
  webhookSendData: string,
  mode: string = "default",
  user_name: string = "webhook",
  user_image: string
) => {
  const currentDate = new Date();
  const formattedDate = `[${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1
  ).padStart(2, "0")}-${String(currentDate.getDate()).padStart(
    2,
    "0"
  )} ${String(currentDate.getHours()).padStart(2, "0")}:${String(
    currentDate.getMinutes()
  ).padStart(2, "0")}:${String(currentDate.getSeconds()).padStart(2, "0")}]`;
  try {
    const compileStartTime = performance.now();
    const webhookUrl = _webhookUrl;
    let dataToSend = {
      content: `${webhookSendData.replace(/@/g, "@\u200B")}`,
      username: "",
      avatar_url: "",
    };

    if (mode === "discord") {
      dataToSend.username = user_name;
      dataToSend.avatar_url = user_image;
    }

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const compileEndTime = performance.now();
    if (!response.ok) {
      console.error("status:", response.status);
      throw new Error("Failed to send data to webhook");
    }
    const compileTime = Math.round(compileEndTime - compileStartTime);
  } catch (error: any) {
    console.error("Error sending message to webhook:", error.message);
  }
};

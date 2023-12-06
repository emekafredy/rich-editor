import { Quill } from "react-quill";

class TikTokBlot extends Quill.import("blots/embed") {
  static blotName = "tiktok";
  static tagName = "div";

  static create(value: any) {
    const node = super.create(value);
    node.innerHTML = this.getTikTokEmbed(value.url);
    return node;
  }

  static value(node: any) {
    return { url: node.getAttribute("data-url") };
  }

  static getTikTokEmbed(url: string) {
    const regex = /\/video\/(\d+)/;
    const match = url.match(regex);

    if (match) {
      const videoId = match[1];
      return `<blockquote
                class="tiktok-embed"
                cite=${url}
                data-video-id=${videoId}
                style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:100%; padding:0;"
              >
                <section>
                  <a
                    target="_blank"
                    title="@mayor9310"
                    href=${url}
                  > Tiktok Post ${videoId} </a>
                </section>
              </blockquote>
              <script async src="https://www.tiktok.com/embed.js"></script>`;
    } else {
      return "";
    }
  }
}

export const embedTikTokLink = (quill: any, url: string) => {
  const editor = (quill.current as any).getEditor();
  const range = editor.getSelection(true);

  const embedData = {
    url,
  };

  editor.insertText(range.index, "\n");
  editor.insertEmbed(range.index + 1, "tiktok", embedData, "user");
  editor.insertText(range.index + 2, "\n");
};

export default TikTokBlot;

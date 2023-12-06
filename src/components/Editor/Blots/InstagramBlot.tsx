import { Quill } from "react-quill";

class InstagramBlot extends Quill.import("blots/embed") {
  static blotName = "instagram";
  static tagName = "div";

  static create(value: any) {
    const node = super.create(value);
    node.innerHTML = this.getInstagramEmbed(value.url);
    return node;
  }

  static value(node: any) {
    return { url: node.getAttribute("data-url") };
  }

  static getInstagramEmbed(url: string) {
    if (url) {
      return `<blockquote
                class="instagram-media"
                data-instgrm-captioned
                data-instgrm-permalink=${url}
                data-instgrm-version="14"
                style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; width:100%; padding:0;">
                <a 
                  href=${url}
                  style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;"
                  target="_blank"
                >
                  <p> View Post on Instagram </p>
                </a>
              </blockquote>
              <script async src="//www.instagram.com/embed.js"></script>`;
    } else {
      return "";
    }
  }
}

export const embedInstagramLink = (quill: any, url: string) => {
  const editor = (quill.current as any).getEditor();
  const range = editor.getSelection(true);

  const embedData = {
    url,
  };

  editor.insertText(range.index, "\n");
  editor.insertEmbed(range.index + 1, "instagram", embedData, "user");
  editor.insertText(range.index + 2, "\n");
};

export default InstagramBlot;

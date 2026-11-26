import { z } from 'zod';

export const WebSearchSchema = z.object({
  query: z.string(),
  limit: z.number().max(100).default(10),
});

export const ToolRegistry = {
  web_search: async (args: z.infer<typeof WebSearchSchema>) => {
    console.log(`[TOOL: WEB_SEARCH] Executing query: ${args.query}`);
    return [
      { company: 'Acme Corp', contact: 'John Doe', email: 'john@acme.com', score: 85 },
      { company: 'Globex', contact: 'Jane Smith', email: 'jane@globex.com', score: 92 }
    ];
  },

  send_email: async (args: { to: string, subject: string, body: string }) => {
    console.log(`[TOOL: SEND_EMAIL] To: ${args.to} | Subject: ${args.subject}`);
    return { success: true, messageId: 'msg_' + Date.now() };
  }
};

export interface AgentTask {
  id: string;
  orgId: string;
  agentRole: 'SDR' | 'AE' | 'Researcher' | 'Supervisor';
  objective: string;
  context: Record<string, any>;
}

export interface AgentResult {
  success: boolean;
  actionTaken: string;
  data?: any;
  error?: string;
}

export class SupervisorAgent {
  private orgId: string;
  private tools: Record<string, Function>;

  constructor(orgId: string, tools: Record<string, Function>) {
    this.orgId = orgId;
    this.tools = tools;
  }

  async run(objective: string): Promise<AgentResult> {
    console.log(`[RIAMI SUPERVISOR] Org: ${this.orgId} | Objective: ${objective}`);
    
    if (objective.toLowerCase().includes('find leads')) {
      return await this.delegateToSDR(objective);
    }
    
    if (objective.toLowerCase().includes('write email')) {
      return await this.delegateToWriter(objective);
    }

    return { success: false, actionTaken: 'No workflow matched objective', error: 'Unhandled objective' };
  }

  private async delegateToSDR(objective: string): Promise<AgentResult> {
    const searchTool = this.tools['web_search'];
    if (!searchTool) throw new Error('Missing tool: web_search');

    try {
      console.log(`[RIAMI SDR] Searching for prospects...`);
      const leads = await searchTool({ query: objective, limit: 50 });
      
      return {
        success: true,
        actionTaken: 'Discovered new leads',
        data: { leadsCount: leads.length, leads }
      };
    } catch (e: any) {
      return { success: false, actionTaken: 'SDR failed', error: e.message };
    }
  }

  private async delegateToWriter(objective: string): Promise<AgentResult> {
    const emailTool = this.tools['send_email'];
    if (!emailTool) throw new Error('Missing tool: send_email');

    try {
      console.log(`[RIAMI AE] Generating and sending outreach...`);
      const result = await emailTool({ 
        to: 'prospect@example.com', 
        subject: 'Partnership Opportunity', 
        body: 'Hi there, saw your company...' 
      });
      return { success: true, actionTaken: 'Email sent', data: result };
    } catch (e: any) {
      return { success: false, actionTaken: 'Writer failed', error: e.message };
    }
  }
  }

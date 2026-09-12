import Tile, { type TileData } from "../components/tile";
const Tile_data: TileData[] = [
    { text: "  Fetch  ", description: "  Brings records together  " },
    { text: "  Match  ", description: "  Identifies related transactions  " },
    { text: "  Trace  ", description: "  Finds the cause of a difference  " },
    { text: "  Resolve  ", description: "  Prepares the right next action  " },
    { text: "  Guard  ", description: "  Policy, permissions and approvals  " },
    { text: "  Close  ", description: "  Outcome recorded with an audit trail  " }
];
/** Efficient Payments At section. */
export default function EfficientPaymentsAtSection({ tileData = Tile_data } = {}) {
  return (
    <section className="flex relative justify-center bg-clr-5">
      <div className="grid max-w-320 grid-cols-32 w-full max-md:max-w-[23.4375rem] max-lg:grid-cols-16 md:max-lg:max-w-192 2xl:max-w-440">
        <h3 className="block mt-45 col-start-2 col-end-16 self-start sticky top-[5.5rem] z-10 text-[3.4375rem] [font-weight:420] leading-[3.4375rem] tracking-[-1.1px] text-balance [font-feature-settings:'calt'] max-lg:mt-22.5 max-lg:[grid-column-end:-2] max-md:text-[2rem] max-md:leading-8 max-md:tracking-[-0.64px] md:max-lg:text-[2.5rem] md:max-lg:leading-10 md:max-lg:tracking-[-0.8px]" data-component="heading">
          {" Six specialists. One continuous financial workflow. "}
        </h3>
        {" "}
        <div className="flex pt-45 pb-[9.0625rem] flex-col gap-7.5 col-start-17 col-end-29 max-lg:pt-15 max-lg:pb-22.5 max-lg:gap-[2.8125rem] max-lg:col-start-2 max-lg:[grid-column-end:-2]">
          {tileData.map((d, i) => <Tile key={i} d={d} />)}
          {" "}
        </div>
        {" "}
        <div className="w-40 h-full block col-start-29 col-end-[-1] max-lg:hidden lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:min-w-0 2xl:w-50">
          <div className="block relative overflow-hidden text-[0.5625rem] leading-[0.75rem] tracking-[0.18px] uppercase h-full w-full" aria-hidden="true" role="presentation">
              <div className="h-[1486.3px] block absolute top-1/2 -right-20 left-20 [translate:0px_-50%] 2xl:-right-25 2xl:left-25">
              <div className="block">
                <pre className="block [font-family:'Akkurat_Mono-dea851e1d19028b9',_'Akkurat_Mono-dea851e1d19028b9_fallback:_Courier_New',_monospace] whitespace-pre [text-wrap:nowrap_pretty]">
                  <code className="inline">
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        module
                      </span>
                      <span className="inline">
                        {" osfin"}
                      </span>
                      <span className="inline">
                        ::
                      </span>
                      <span className="inline">
                        workflow
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// FINANCIAL OPERATIONS, EXPLAINED"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Fetch · Match · Trace · Resolve · Guard · Close"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" fetch_records"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Rethink value. Rebuild trust. Rewrite the rules."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Records converge into one verified outcome."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" enable_new_era"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// What’s next moves here."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// No hype. Just real progress."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" launch_next_phase"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"}"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        module
                      </span>
                      <span className="inline">
                        {" osfin"}
                      </span>
                      <span className="inline">
                        ::
                      </span>
                      <span className="inline">
                        doers
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Match related transactions at volume."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// No downtime. No forks. Just forward momentum."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" deploy_with_speed"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Get help, not hype."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Grants, tools, and support for real builders."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" access_builder_support"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Tools that work. Docs you can trust."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Build with clarity and confidence."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" use_production_tooling"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Push to mainnet. Trust the infrastructure."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Trace the cause of every difference."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" push_to_mainnet"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"}"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        module
                      </span>
                      <span className="inline">
                        {" osfin"}
                      </span>
                      <span className="inline">
                        ::
                      </span>
                      <span className="inline">
                        quietly_excellent
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Quiet execution. Reliable outcomes."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Guard policy, then close the audit trail."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" verify_infrastructure_integrity"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Break ground. Not trust."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Built-in performance you can validate."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" ensure_audit_readiness"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Built to work. Designed to last."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Engineered for stability, not spectacle."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" maintain_network_stability"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"}"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        module
                      </span>
                      <span className="inline">
                        {" osfin"}
                      </span>
                      <span className="inline">
                        ::
                      </span>
                      <span className="inline">
                        performance_first
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Sub-second finality. Scales to millions of users."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Designed for performance at any load."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" handle_high_throughput"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Built for scale. Maintains performance under pressure."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Modular beneath. Seamless above."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" scale_modularly"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Upgrade without disruption."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Keep building, even while evolving."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" upgrade_without_downtime"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"}"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        module
                      </span>
                      <span className="inline">
                        {" osfin"}
                      </span>
                      <span className="inline">
                        ::
                      </span>
                      <span className="inline">
                        ecosystem_energy
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// From mismatch to explanation to resolution."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// A growing network of builders and believers."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" grow_with_ecosystem"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Real support. Real partners. Shared momentum."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// An ecosystem that grows with you."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" launch_with_partners"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline" />
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Cross-chain. Cross-border. Cross-culture."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    /// Connect across Web3, securely and simply."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    public"}
                      </span>
                      <span className="inline">
                        {" fun"}
                      </span>
                      <span className="inline">
                        {" connect_across_networks"}
                      </span>
                      <span className="inline">
                        {"(): "}
                      </span>
                      <span className="inline">
                        bool
                      </span>
                      <span className="inline">
                        {" {"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        ..."}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"        return"}
                      </span>
                      <span className="inline">
                        {" true"}
                      </span>
                      <span className="inline">
                        ;
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"    }"}
                      </span>
                    </span>
                    {"\n"}
                    <span className="inline">
                      <span className="inline">
                        {"}"}
                      </span>
                    </span>
                    {"\n"}
                  </code>
                </pre>
              </div>
              {" "}
            </div>
            {" "}
          </div>
          {" "}
        </div>
        {" "}
      </div>
      {" "}
    </section>
  );
}

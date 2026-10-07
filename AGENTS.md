<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application architecture
- Preserve reference-site hash navigation for home sections and separate contact/legal routes because this project is an exact website recreation.
- Share site chrome and reusable content sections across TanStack routes to keep the replica consistent.
- Import downloaded original media using asset pointers to preserve the source visuals without hotlinking.
- Save public enquiries through a validated, rate-limited server function into a private table; anonymous visitors must never read submission data.
- Render imported policy content from a restricted structured tree rather than arbitrary remote HTML.

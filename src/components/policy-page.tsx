import { createElement, type ReactNode } from 'react';
import policies from '@/lib/policies.json';
type ContentNode = {text?:string;tag?:string;href?:string|null;children?:ContentNode[]};
function renderNode(n:ContentNode,key:number):ReactNode { if(n.text!==undefined)return n.text;if(!n.tag)return null; const props=n.tag==='a'?{key,href:n.href??undefined}:{key};return createElement(n.tag,props,...(n.children??[]).map(renderNode)); }
export function PolicyPage({slug}:{slug:keyof typeof policies}) {return <main className="policy-page">{(policies[slug] as ContentNode[]).map(renderNode)}</main>;}

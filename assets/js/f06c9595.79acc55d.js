"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[832],{6284:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>h,frontMatter:()=>a,metadata:()=>s,toc:()=>d});const s=JSON.parse('{"id":"Attacks/Message","title":"Exploit Messages","description":"This topic is closely related to the previous chapter, but it is more important. It is one of the most common mistakes I have encountered.","source":"@site/docs/Attacks/Message.mdx","sourceDirName":"Attacks","slug":"/Attacks/Message","permalink":"/Attacks/Message","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Exploit addEventListener","permalink":"/Attacks/Events"},"next":{"title":"Open Closed Shadow DOM","permalink":"/Attacks/Shadow"}}');var i=n(4848),o=n(8453);const a={sidebar_position:2},r="Exploit Messages",c={},d=[{value:"Source manipulation",id:"source-manipulation",level:2},{value:"postMessage proxy Attack",id:"postmessage-proxy-attack",level:2},{value:"Event Type Confusion",id:"event-type-confusion",level:2}];function l(e){const t={a:"a",blockquote:"blockquote",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.header,{children:(0,i.jsx)(t.h1,{id:"exploit-messages",children:"Exploit Messages"})}),"\n",(0,i.jsx)(t.p,{children:"This topic is closely related to the previous chapter, but it is more important. It is one of the most common mistakes I have encountered."}),"\n",(0,i.jsxs)(t.p,{children:["As mentioned earlier, one of the main ways to transmit data in a content script is ",(0,i.jsx)(t.code,{children:"postMessage"}),". However, the problem is that people use the same approaches for messages on websites as they do for postMessage in extensions, which leads to errors.\nLet's consider an example of a ",(0,i.jsx)(t.code,{children:"content script"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'//...\nwindow.addEventListener("message",()=>{\n    if(event.origin !== "https://connector.trusted.origin")\n        return;\n    //...\n})\n//...\n'})}),"\n",(0,i.jsx)(t.p,{children:"Such logic is often applied in situations where extension developers want to allow a trusted site (most often their own, implementing auth) to transmit data to the content script, while not wanting those data to be sent by other origins."}),"\n",(0,i.jsx)(t.p,{children:"This check is indeed correct, but only if we are talking about web applications, not extensions. I think if you read the previous chapter, it is obvious to you that an attacker's site can simply do something like:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const event = new MessageEvent("message",{data:{test:1}, origin: "https://connector.trusted.origin"})\nwindow.dispatchEvent(event)\n'})}),"\n",(0,i.jsx)(t.h2,{id:"source-manipulation",children:"Source manipulation"}),"\n",(0,i.jsx)(t.p,{children:"However, during my research on extensions, I encountered such logic several times:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'window.addEventListener("message",()=>{\n    if(event.source.origin !== "https://connector.trusted.origin")\n        return;\n    //...\n})\n'})}),"\n",(0,i.jsx)(t.p,{children:"At first glance, you might think that in this case, the situation is identical and you can do something like:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const new_window = window.open("https://connector.trusted.origin");\nconst event = new MessageEvent("message",{data:{test:1}, origin: "https://connector.trusted.origin", source: new_window})\nwindow.dispatchEvent(event)\n'})}),"\n",(0,i.jsxs)(t.p,{children:["However, our origin (and the content script within it, respectively) does not have access to ",(0,i.jsx)(t.code,{children:"new_window.origin"})," due to CORS.\n",(0,i.jsx)(t.img,{alt:"CORS",src:n(2595).A+"",width:"3248",height:"1986"})]}),"\n",(0,i.jsx)(t.p,{children:"Perhaps someone had the idea to simply pass an object in the source, something like this:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const event = new MessageEvent("message",{data:{test:1}, origin: "https://connector.trusted.origin", source: {origin:"https://connector.trusted.origin"}})\nwindow.dispatchEvent(event)\n'})}),"\n",(0,i.jsx)(t.p,{children:"But you will get an error:"}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"Uncaught TypeError: Failed to construct 'MessageEvent': Failed to read the 'source' property from 'MessageEventInit': Failed to convert value to 'EventTarget'."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["But what is ",(0,i.jsx)(t.a,{href:"https://developer.mozilla.org/en-US/docs/Web/API/EventTarget",children:"EventTarget"}),"?"]}),"\n",(0,i.jsxs)(t.blockquote,{children:["\n",(0,i.jsx)(t.p,{children:"The EventTarget interface is implemented by objects that can receive events and may have listeners for them. In other words, any target of events implements the three methods associated with this interface.\nElement, and its children, as well as Document and Window, are the most common event targets, but other objects can be event targets, too. For example, IDBRequest, AudioNode, and AudioContext are also event targets."}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"Does this mean that we can use any EventTarget in message.source? - No.\nFor example, you can run the code:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const event = new MessageEvent("message",{source: document})\nwindow.dispatchEvent(event)\n'})}),"\n",(0,i.jsx)(t.p,{children:"You will get an error:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{children:"Uncaught TypeError: Failed to construct 'MessageEvent': The optional 'source' property is neither a Window nor MessagePort.\n"})}),"\n",(0,i.jsxs)(t.p,{children:["At this point, one might give up, but I went to read the source code of Chromium. This check is located at the following ",(0,i.jsx)(t.a,{href:"https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/events/message_event.cc;drc=3eda4803875e7a6b75631b8b399fdebe0c5958ca;l=99",children:"address"})]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-C++",children:"static inline bool IsValidSource(EventTarget* source) {\n  return !source || source->ToDOMWindow() || source->ToMessagePort() ||\n         source->ToServiceWorker();\n}\n// ...\nif (initializer->hasSource() && IsValidSource(initializer->source()))\n    source_ = initializer->source();\n"})}),"\n",(0,i.jsxs)(t.p,{children:["However, in this same file, there is another way to initialize a message ",(0,i.jsx)(t.a,{href:"https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/core/events/message_event.cc;drc=3eda4803875e7a6b75631b8b399fdebe0c5958ca;l=214",children:(0,i.jsx)(t.code,{children:"initMessageEvent"})}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-C++",children:"void MessageEvent::initMessageEvent(const AtomicString& type,\n                                    bool bubbles,\n                                    bool cancelable,\n                                    const ScriptValue& data,\n                                    const String& origin,\n                                    const String& last_event_id,\n                                    EventTarget* source,\n                                    MessagePortArray ports) {\n  if (IsBeingDispatched())\n    return;\n\n  initEvent(type, bubbles, cancelable);\n\n  data_type_ = kDataTypeScriptValue;\n  data_as_v8_value_.Set(data.GetIsolate(), data.V8Value());\n  is_data_dirty_ = true;\n  origin_ = origin;\n  last_event_id_ = last_event_id;\n  source_ = source;\n  if (ports.empty()) {\n    ports_ = nullptr;\n  } else {\n    ports_ = MakeGarbageCollected<MessagePortArray>(std::move(ports));\n  }\n  is_ports_dirty_ = true;\n}\n"})}),"\n",(0,i.jsx)(t.p,{children:"As you can see, the Chromium developers skipped the corresponding check in it.\nTherefore, you can execute:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'            var exploit_message = new MessageEvent("message");\n            exploit_message.initMessageEvent("message",false,false,{},"https://example.origin","",document,[])\n            window.dispatchEvent(exploit_message)\n'})}),"\n",(0,i.jsx)(t.p,{children:"You will see that the message was successfully sent, and the source is the document.\nNow, to bypass the check discussed earlier, you just need to execute the following code:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const source = document.createElement(\'a\')\nsource.href="https://connector.trusted.origin"\nexploit_message.initMessageEvent("message",false,false,{},"https://example.origin","",source,[])\n'})}),"\n",(0,i.jsxs)(t.p,{children:["This will work because the ",(0,i.jsx)(t.code,{children:"<a>"})," tag has a default getter for ",(0,i.jsx)(t.code,{children:"origin"}),"."]}),"\n",(0,i.jsxs)(t.p,{children:["I reported this ",(0,i.jsx)(t.a,{href:"https://issues.chromium.org/issues/382291454",children:"issue"})," to the Chrome developers, but they said they do not want to fix it at this time. So you can freely use this technique in your research."]}),"\n",(0,i.jsx)(t.h2,{id:"postmessage-proxy-attack",children:"postMessage proxy Attack"}),"\n",(0,i.jsx)(t.p,{children:"Also, while reviewing extensions, I noticed a fairly common pattern:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:"window.addEventListener(\"message\",(event)=>{\n    if(event.data.type==='to_content_script'){\n        window.postMessage(event.data, '*')\n    }\n})\n\n// OR\n\nwindow.addEventListener(\"message\",(event)=>{\n    window.postMessage(handlers[event.data.type](event.data.data), '*')\n})\n"})}),"\n",(0,i.jsx)(t.p,{children:"The problem with such solutions is that while you may not be creating problems for your extension, you allow messages to be sent from the origin of any site on which this content script is running. In the first case, this is obvious, and in the second case, the problem is that we can send a message like:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'targetWindow.postMessage({type: "constructor", data: {...}})\n'})}),"\n",(0,i.jsxs)(t.p,{children:["Because ",(0,i.jsx)(t.code,{children:'handlers["constructor"](event.data.data)'})," simply reflects the data.\nTherefore, the presence of a proxy pattern in an extension can be considered a vulnerability."]}),"\n",(0,i.jsx)(t.h2,{id:"event-type-confusion",children:"Event Type Confusion"}),"\n",(0,i.jsx)(t.p,{children:"I have also never seen anyone check the type of the event they receive."}),"\n",(0,i.jsx)(t.p,{children:"The fact is that we can send an event of any type with any name, for example:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-javascript",children:'const event = new InputEvent("message",{data: "text"})\nwindow.dispatchEvent(event)\n'})}),"\n",(0,i.jsxs)(t.p,{children:["And you will see that the ",(0,i.jsx)(t.code,{children:"message"})," listener will intercept this event. It will have a ",(0,i.jsx)(t.code,{children:"data"})," field, but it will not have ",(0,i.jsx)(t.code,{children:"source"})," and ",(0,i.jsx)(t.code,{children:"origin"})," fields, which often also leads to errors."]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}},2595:(e,t,n)=>{n.d(t,{A:()=>s});const s=n.p+"assets/images/CORS-31611017e706f01bb25dbb35e474ac57.png"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>r});var s=n(6540);const i={},o=s.createContext(i);function a(e){const t=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),s.createElement(o.Provider,{value:t},e.children)}}}]);
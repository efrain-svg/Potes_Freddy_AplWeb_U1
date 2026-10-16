from pathlib import Path
from html.parser import HTMLParser
import json, re

base = Path(__file__).resolve().parent
class Structure(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack=[]; self.errors=[]; self.ids=[]; self.refs=[]; self.headings=[]
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if len(a)!=len(attrs): self.errors.append('Atributo duplicado en '+tag)
        if 'id' in a:self.ids.append(a['id'])
        for key in ['for','aria-controls','aria-describedby','aria-labelledby']:
            if key in a:self.refs.extend(a[key].split())
        if tag=='a' and a.get('href','').startswith('#'):self.refs.append(a['href'][1:])
        if re.fullmatch('h[1-6]',tag):self.headings.append(int(tag[1]))
        if tag=='img' and 'alt' not in a:self.errors.append('Imagen sin alt')
        if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.stack.append(tag)
    def handle_endtag(self,tag):
        if not self.stack or self.stack[-1]!=tag:self.errors.append('Cierre incorrecto '+tag)
        else:self.stack.pop()

p=Structure(); p.feed((base/'index.html').read_text(encoding='utf-8'))
assert not p.errors and not p.stack,(p.errors,p.stack)
assert len(set(p.ids))==len(p.ids)
assert all(x in p.ids for x in p.refs)
assert p.headings.count(1)==1 and all(b<=a+1 for a,b in zip(p.headings,p.headings[1:]))

print('HTML: estructura, IDs, referencias y encabezados correctos. Revision basica local.')


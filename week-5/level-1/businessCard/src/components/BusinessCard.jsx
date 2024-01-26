export function BusinessCard({ name, description, socialMedia, interests }) {
  return (
    <div className="p-4 bg-cyan-500 border rounded-2xl flex flex-col gap-4">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="font-light">{description}</p>
      </div>

      <div>
        <h3 className="text-lg font-bold">Interest</h3>
        <ul class="list-inside list-disc flex gap-4">
          {interests.map((interest) => {
            return <li>{interest}</li>;
          })}
        </ul>
      </div>

      <div>
        <p className="text-lg font-bold">Follow me!</p>
        <div className="flex gap-4">
          {socialMedia.map((social) => {
            return (
              <a
                href="#"
                className="p-2 border rounded-md text-slate-50 bg-blue-600"
              >
                {social}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

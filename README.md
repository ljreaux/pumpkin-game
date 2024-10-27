# Phaser Next.js TypeScript Template

This is a Phaser 3 project template that uses Next.js 15 as the framework, Tailwind CSS for styling, and ShadCN for UI components. The project includes a bridge for communication between React components and the Phaser game, utilizing Next.js's App Router for streamlined navigation.

### Versions

This template has been updated for:

- [Phaser 3.86.0](https://github.com/phaserjs/phaser)
- [Next.js 15](https://github.com/vercel/next.js)
- [TypeScript 5](https://github.com/microsoft/TypeScript)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://shadcn.dev/)

![screenshot](screenshot.png)

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command         | Description                          |
| --------------- | ------------------------------------ |
| `npm install`   | Install project dependencies         |
| `npm run dev`   | Launch a development web server      |
| `npm run build` | Create a production build in `.next` |

## Writing Code

After cloning the repo, run `npm install` from your project directory. Then, you can start the local development server by running `npm run dev`.

The local development server runs on `http://localhost:3000` by default. To change the configuration, refer to the Next.js and Tailwind CSS documentation.

Once the server is running, you can edit any files in the `app` folder or other relevant files. Next.js will automatically recompile your code and reload the browser.

## Template Project Structure

This template includes a project structure optimized for Next.js:

- `app` - Contains the Next.js App Router structure and page components.
- `app/page.tsx` - The primary page component for the game.
- `components/game/PhaserGame.tsx` - A component that initializes the Phaser Game, acting as a bridge between React and Phaser.
- `components/game/EventBus.ts` - A simple event bus for communication between React and Phaser.
- `components/game/scenes/` - Contains Phaser Scenes.

## React-Phaser Bridge

The `PhaserGame.tsx` component serves as a bridge between Next.js (React) and Phaser. It initializes the Phaser game and allows communication between the two using an **EventBus**. You can use it to pass events between React and Phaser.

```typescript
// Emitting an event from React
EventBus.emit("event-name", data);

// Listening for an event in Phaser
EventBus.on("event-name", (data) => {
  // Handle the data
});
```

## Styling with Tailwind and ShadCN

Tailwind CSS is used for responsive layouts and utility-based styling, while ShadCN provides customizable UI components, including buttons, modals, and more. Refer to `tailwind.config.js` for customization options.

## Handling Assets

Place static assets (e.g., images, audio) in the `public/assets` folder. To use assets in your game, reference them as follows:

```typescript
preload() {
    // Load an image from the public assets folder
    this.load.image('background', '/assets/bg.png');
}
```

## Deploying to Production

Use `npm run build` to create a production build in the `.next` folder. All content in the `.next` folder needs to be uploaded to a public-facing web server for deployment.

## Customizing the Template

### Next.js and Tailwind Configuration

To tailor this template to your needs, you can adjust `next.config.js` for application-wide settings and `tailwind.config.js` for styling options or utility classes. Additional plugins or configurations can be added as necessary for custom functionality. For detailed guidance, refer to the [Next.js](https://nextjs.org/docs) and [Tailwind](https://tailwindcss.com/docs) documentation.

## Credits

This template is an adaptation of an original Phaser template created by [Phaser Studio](mailto:support@phaser.io). I wanted to create a new template using the app router in Next.js seeing as the official one for Next.js still uses the pages router and renders the entire app without SSR. This template only renders the game itself client side, allowing you to incorporate it into a larger application that allows SSR.

# Overview

TradeScout USA is a full-stack web application designed to connect American homeowners and US contractors directly without intermediaries. The platform serves as a landing page with early access signup functionality, targeting users who want to avoid traditional lead generation platforms that act as middlemen. TradeScout is a network where homeowners can find verified contractors for various home improvement services including remodeling, painting, roofing, flooring, and other construction-related work.

# User Preferences

Preferred communication style: Simple, everyday language.
Messaging preference: Avoid overly salesy or aggressive marketing language; prefer educational and subtle approaches. Focus on TradeScout's value proposition rather than attacking competitors - show superiority through positive differentiation. TradeScout is a professional network, not a competitor to lead generation platforms - we're in a different realm entirely.
Design philosophy: Break design molds and create unconventional, bold layouts that stand out from typical websites.
Foundation work: TradeScout supports multiple charitable foundations and worthy causes, not exclusively Mike Rowe WORKS Foundation (which is one prominent example but not the only one).
Visual preferences: Prefer clean SVG icons over emojis for better design consistency.
Calculator feature: Uses hyper-local information and market data to provide the most accurate pricing possible for specific geographic areas.
Helpers feature: Platform for contractors to find employees and for homeowners to find laborers or people starting their trades business/side gig.
Content preferences: Keep original hero title "Connection Without Compromise" and "predatory predecessors" messaging - do not change these without explicit request.

# System Architecture

## Frontend Architecture
The frontend is built using React with TypeScript and follows a modern component-based architecture. The application uses Vite as the build tool and development server, providing fast hot module replacement and optimized builds. The UI is constructed using shadcn/ui components built on top of Radix UI primitives, ensuring accessibility and consistent design patterns.

The routing is handled by Wouter, a lightweight React router, with a simple structure covering home, thank-you, and 404 pages. State management utilizes TanStack Query (React Query) for server state management and caching, while local component state is managed through React hooks.

The styling system uses Tailwind CSS with custom CSS variables for theming, implementing a dark theme design with TradeScout's brand colors (orange/brand theme). The design system includes custom gradients, shadows, and spacing that align with the brand identity.

## Backend Architecture
The backend is built on Express.js with TypeScript, implementing a REST API architecture. The server follows a modular structure with separate route handlers and storage abstractions. The application uses middleware for request logging, JSON parsing, and error handling.

The storage layer is abstracted through an interface (`IStorage`) with a current in-memory implementation (`MemStorage`). This abstraction allows for easy migration to database storage in the future while maintaining the same API surface.

## Data Storage Solutions
Currently, the application uses an in-memory storage system for development and testing purposes. The schema is defined using Drizzle ORM with PostgreSQL as the target database dialect. Two main entities are defined:
- Users table for authentication (future use)
- Signups table for early access registration with email, state, and user roles

The database schema supports user roles including homeowner, contractor, and helper, allowing for different user types to be identified during the signup process.

## Authentication and Authorization
The current implementation includes schema definitions for user authentication but does not have active authentication middleware. The foundation is laid for future implementation with user credentials and session management. The signup process currently focuses on collecting early access information rather than creating authenticated user accounts.

## External Dependencies
- **Neon Database**: Configured as the PostgreSQL database provider through the `@neondatabase/serverless` package
- **Drizzle ORM**: Database toolkit and ORM for type-safe database operations
- **Radix UI**: Comprehensive set of accessible UI primitives
- **TanStack Query**: Server state management and data fetching
- **Tailwind CSS**: Utility-first CSS framework for styling
- **React Hook Form**: Form state management with validation
- **Zod**: Schema validation for type-safe data parsing
- **Vite**: Build tool and development server with Replit-specific plugins for development environment integration

The application is designed to be deployed on Replit with specific configurations for the development environment, including runtime error overlays and cartographer integration for debugging.